package com.example.LaptopShop.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.controller.client.OtpVerifyResult;
import com.example.LaptopShop.domain.OtpEntity;
import com.example.LaptopShop.domain.dto.OrderDTO;
import com.example.LaptopShop.domain.dto.OrderData;
import com.example.LaptopShop.repository.OrderDTORepository;
import com.example.LaptopShop.repository.OtpRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final OrderDTORepository orderDTORepository;

    private final int MAX_ATTEMPTS = 5;
    private final int BLOCK_DURATION_MINUTES = 5;

    private final Map<String, Integer> attempts = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> blockTimes = new ConcurrentHashMap<>();

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void sendOtpToUser(Long userId, String email, Long orderId) {
        String otpCode = generateOtp();

        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtpCode(otpCode);
        otpEntity.setCreatedAt(LocalDateTime.now());
        otpEntity.setExpiredAt(LocalDateTime.now().plusMinutes(5));
        otpEntity.setVerified(false);
        otpEntity.setUserId(userId);
        otpEntity.setOrderId(orderId);

        otpRepository.save(otpEntity);
        emailService.sendOtpEmail(email, otpCode, orderId);

        System.out.println("OTP gửi tới " + email + ": " + otpCode);
    }

    public OtpVerifyResult verifyOtp(Long userId, String otpCode, Long orderId) {
        String key = String.valueOf(userId);

        if (isBlocked(key)) {
            if (canUnblock(key)) {
                resetAttempts(key);
            } else {
                return new OtpVerifyResult(false, "Bạn đã vượt quá số lần nhập OTP. Vui lòng thử lại sau 5 phút.");
            }
        }

        Optional<OtpEntity> otpOptional = otpRepository.findByUserIdAndOrderId(userId, orderId);
        if (otpOptional.isEmpty()) {
            return new OtpVerifyResult(false, "Đơn hàng không tồn tại hoặc không đúng người dùng.");
        }

        OtpEntity otp = otpOptional.get();

        if (otp.isVerified()) {
            return new OtpVerifyResult(false, "Mã OTP đã được sử dụng.");
        }

        if (otp.getExpiredAt().isBefore(LocalDateTime.now())) {
            return new OtpVerifyResult(false, "Mã OTP đã hết hạn.");
        }

        if (otp.getOtpCode().equals(otpCode)) {
            otp.setVerified(true);
            otpRepository.save(otp);
            resetAttempts(key);
            return new OtpVerifyResult(true, "Xác minh OTP thành công.");
        } else {
            recordFailedAttempt(key);
            int remaining = Math.max(0, MAX_ATTEMPTS - getFailedAttempts(key));

            if (isBlocked(key)) {
                blockTimes.put(key, LocalDateTime.now());
                return new OtpVerifyResult(false, "Bạn đã vượt quá số lần nhập OTP. Vui lòng thử lại sau 5 phút.");
            }

            return new OtpVerifyResult(false, "OTP không chính xác. Bạn còn " + remaining + " lần thử.");
        }
    }

    // public void setOrderStatus{
    // Optional<OrderDTO> optionalOrder = orderDTORepository.findById(orderId);
    // if (optionalOrder.isPresent()) {
    // OrderDTO order = optionalOrder.get();
    // ObjectMapper mapper = new ObjectMapper();
    // try {
    // OrderData data = mapper.readValue(order.getData(), OrderData.class);
    // data.setStatus("Đã xác thực");
    // order.setData(mapper.writeValueAsString(data));
    // orderDTORepository.save(order);
    // } catch (JsonProcessingException e) {
    // e.printStackTrace(); // hoặc log lỗi
    // }
    // }
    // }

    public void recordFailedAttempt(String key) {
        attempts.put(key, getFailedAttempts(key) + 1);
    }

    public int getFailedAttempts(String key) {
        return attempts.getOrDefault(key, 0);
    }

    public boolean isBlocked(String key) {
        return getFailedAttempts(key) >= MAX_ATTEMPTS;
    }

    public boolean canUnblock(String key) {
        LocalDateTime blockTime = blockTimes.get(key);
        return blockTime != null && LocalDateTime.now().isAfter(blockTime.plusMinutes(BLOCK_DURATION_MINUTES));
    }

    public void resetAttempts(String key) {
        attempts.remove(key);
        blockTimes.remove(key);
    }
}
