package com.example.LaptopShop.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.OtpEntity;
import com.example.LaptopShop.repository.OtpRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    private final int MAX_ATTEMPTS = 5;
    private final int BLOCK_DURATION_MINUTES = 5;

    // Lưu: email → số lần thử
    private final Map<String, Integer> attempts = new ConcurrentHashMap<>();
    // Lưu: email → thời gian bị block
    private final Map<String, LocalDateTime> blockTimes = new ConcurrentHashMap<>();

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void sendOtpToUser(String email, Long orderId) {
        String otpCode = generateOtp();

        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtpCode(otpCode);
        otpEntity.setCreatedAt(LocalDateTime.now());
        otpEntity.setExpiredAt(LocalDateTime.now().plusMinutes(5));
        otpEntity.setVerified(false);
        otpEntity.setOrderId(orderId);

        otpRepository.save(otpEntity);
        emailService.sendOtpEmail(email, otpCode, orderId);

        System.out.println("OTP gửi tới " + email + ": " + otpCode);
    }

    public String verifyOtp(String email, String otpCode, Long orderId) {
        if (isBlocked(email)) {
            if (canUnblock(email)) {
                resetAttempts(email);
            } else {
                return "Bạn đã vượt quá số lần nhập OTP. Vui lòng thử lại sau 5 phút.";
            }
        }

        Optional<OtpEntity> otpOptional = otpRepository.findByEmailAndOrderId(email, orderId);
        if (otpOptional.isEmpty()) {
            return "Đơn hàng không tồn tại hoặc không đúng email.";
        }

        OtpEntity otp = otpOptional.get();

        if (otp.isVerified()) {
            return "Mã OTP đã được sử dụng.";
        }

        if (otp.getExpiredAt().isBefore(LocalDateTime.now())) {
            return "Mã OTP đã hết hạn.";
        }

        if (otp.getOtpCode().equals(otpCode)) {
            otp.setVerified(true);
            otpRepository.save(otp);
            resetAttempts(email);
            return "Xác minh OTP thành công.";
        } else {
            recordFailedAttempt(email);
            int remaining = Math.max(0, MAX_ATTEMPTS - getFailedAttempts(email));

            if (isBlocked(email)) {
                blockTimes.put(email, LocalDateTime.now());
                return "Bạn đã vượt quá số lần nhập OTP. Vui lòng thử lại sau 5 phút.";
            }

            return "Mã OTP không đúng. Bạn còn " + remaining + " lần thử.";
        }
    }

    public void recordFailedAttempt(String email) {
        attempts.put(email, getFailedAttempts(email) + 1);
    }

    public int getFailedAttempts(String email) {
        return attempts.getOrDefault(email, 0);
    }

    public boolean isBlocked(String email) {
        return getFailedAttempts(email) >= MAX_ATTEMPTS;
    }

    public boolean canUnblock(String email) {
        LocalDateTime blockTime = blockTimes.get(email);
        if (blockTime == null)
            return false;

        return LocalDateTime.now().isAfter(blockTime.plusMinutes(BLOCK_DURATION_MINUTES));
    }

    public void resetAttempts(String email) {
        attempts.remove(email);
        blockTimes.remove(email);
    }
}
