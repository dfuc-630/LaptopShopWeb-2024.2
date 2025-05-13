package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.LaptopShop.domain.dto.OtpVerifyRequest;
import com.example.LaptopShop.service.OtpService;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/checkout/otp")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")

public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody Map<String, Object> request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(403).body(Map.of("message", "Bạn chưa đăng nhập"));
        }

        String email = principal.getName();
        Long orderId = Long.parseLong(request.get("orderId").toString());

        otpService.sendOtpToUser(email, orderId);

        return ResponseEntity.ok(Map.of(
                "message", "OTP đã gửi tới " + email + " cho đơn hàng #" + orderId));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerifyRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Bạn chưa đăng nhập"));
        }

        String email = principal.getName();

        try {
            boolean result = otpService.verifyOtp(email, request.getOtp(), request.getOrderId());
            if (result) {
                return ResponseEntity.ok(Map.of("message", "Xác minh OTP thành công"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Mã OTP không đúng hoặc đã hết hạn"));
            }
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }
}