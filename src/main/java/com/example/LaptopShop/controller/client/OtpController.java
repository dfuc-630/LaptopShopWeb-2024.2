package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.LaptopShop.domain.dto.OtpVerifyRequest;
import com.example.LaptopShop.service.OtpService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/otp")
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

        return ResponseEntity.ok(Map.of("message", "OTP đã gửi tới " + email + " cho đơn hàng #" + orderId));
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody OtpVerifyRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Bạn chưa đăng nhập"));
        }
        String email = principal.getName();
        String resultMessage = otpService.verifyOtp(email, request.getOtp(), request.getOrderId());

        if (resultMessage.equals("Xác minh OTP thành công.")) {
            return ResponseEntity.ok(Map.of("message", resultMessage));
        } else if (resultMessage.contains("vượt quá số lần")) {
            return ResponseEntity.status(HttpStatus.LOCKED).body(Map.of("message", resultMessage));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", resultMessage));
        }
    }
}
