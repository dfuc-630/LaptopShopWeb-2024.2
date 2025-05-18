package com.example.LaptopShop.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PinService {
    private final UserRepository userRepository;
    private final @Lazy PasswordEncoder passwordEncoder;

    private final int MAX_ATTEMPTS = 5;
    private final Map<String, Integer> attempts = new ConcurrentHashMap<>();

    public boolean verifyPin(String email, String inputPin) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new IllegalArgumentException("Không tìm thấy người dùng với email: " + email);
        }

        if (user.getPin() == null) {
            throw new IllegalStateException("Người dùng chưa thiết lập mã PIN.");
        }

        if (isBlocked(email)) {
            return false;
        }

        boolean match = passwordEncoder.matches(inputPin, user.getPin());

        if (match) {
            resetAttempts(email);
            return true;
        } else {
            recordFailedAttempt(email);
            return false;
        }
    }

    public void recordFailedAttempt(String email) {
        attempts.put(email, getFailedAttempts(email) + 1);
    }

    public int getFailedAttempts(String email) {
        return attempts.getOrDefault(email, 0); // nếu email tồn tại thì trả về số lần nhập sai, nếu không thì trả về 0
    }

    public boolean isBlocked(String email) {
        return getFailedAttempts(email) >= MAX_ATTEMPTS;
    }

    public void resetAttempts(String email) {
        attempts.remove(email);
    }

    public int getRemainingAttempts(String email) {
        return MAX_ATTEMPTS - getFailedAttempts(email);
    }

    public void setUserPin(String email, String rawPin) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPin(passwordEncoder.encode(rawPin));
            userRepository.save(user);
        }
    }
}
