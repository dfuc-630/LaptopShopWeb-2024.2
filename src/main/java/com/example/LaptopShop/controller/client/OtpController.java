package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.LaptopShop.service.OtpService;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/checkout/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(403).body("Bạn chưa đăng nhập");
        }
        String email = principal.getName();
        otpService.sendOtpToUser(email);
        return ResponseEntity.ok("OTP đã gửi tới " + email);
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody Map<String, String> request,
            Principal principal) {
        Map<String, String> response = new HashMap<>();
        if (principal == null) {
            response.put("error", "Bạn chưa đăng nhập");
            return ResponseEntity.status(403).body(response);
        }

        String email = principal.getName();
        String otpCode = request.get("otp");

        if (otpService.isBlocked(email)) {
            response.put("error", "Tài khoản đã bị khóa do nhập sai OTP quá nhiều lần. Vui lòng liên hệ CSKH.");
            return ResponseEntity.status(403).body(response);
        }

        if (otpService.verifyOtp(email, otpCode)) {
            otpService.resetAttempts(email);
            response.put("message", "success");
            return ResponseEntity.ok(response);
        } else {
            otpService.recordFailedAttempt(email);
            int remaining = otpService.getMaxAttempts() - otpService.getFailedAttempts(email);
            response.put("error", "Mã OTP không đúng. Bạn còn " + remaining + " lần thử.");
            return ResponseEntity.status(401).body(response);
        }
    }
}