package com.example.LaptopShop.service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.OtpEntity;
import com.example.LaptopShop.repository.OtpRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final OtpRepository otpRepository;
    // gioi han so lan nhap otp
    private final int MAX_ATTEMPTS = 5;
    private final Map<String, Integer> attempts = new ConcurrentHashMap<>();

    public String genrateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void sendOtpToUser(String email, Long orderId) {
        String otpCode = genrateOtp();

        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtpCode(otpCode);
        otpEntity.setCreatedAt(LocalDateTime.now());
        otpEntity.setExpiredAt(LocalDateTime.now().plusMinutes(5)); // Otp het han sau 5p
        otpEntity.setVerified(false);
        otpEntity.setOrderId(orderId);

        otpRepository.save(otpEntity);

        System.out.println("OTP gửi tới " + email + ": " + otpCode);
    }

    public boolean verifyOtp(String email, String otpCode, Long orderId) {
        var otpOptional = otpRepository.findByEmailAndOtpCodeAndOrderId(email, otpCode, orderId);

        if (otpOptional.isEmpty()) {
            throw new IllegalArgumentException("Nhập mã otp sai hoặc đơn hàng không tồn tại");
        }

        var otp = otpOptional.get();

        if (otp.isVerified()) {
            throw new IllegalStateException("Mã OTP đã được sử dụng.");
        }

        if (otp.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Mã OTP đã hết hạn.");
        }

        otp.setVerified(true);
        otpRepository.save(otp);
        return true;
    }

    public int getMaxAttempts() {
        return MAX_ATTEMPTS;
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

    public void resetAttempts(String email) {
        attempts.remove(email);
    }
}