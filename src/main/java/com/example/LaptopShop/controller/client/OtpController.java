package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.domain.dto.OtpVerifyRequest;
import com.example.LaptopShop.service.OtpService;
import com.example.LaptopShop.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class OtpController {

    private final OtpService otpService;
    private final UserService userService;

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody OtpVerifyRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("success", false, "message", "Bạn chưa đăng nhập"));
        }

        String email = principal.getName();
        User user = userService.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Không tìm thấy người dùng"));
        }

        Long userId = user.getId();
        OtpVerifyResult result = otpService.verifyOtp(userId, request.getOtp(), request.getOrderId());

        if (result.isSuccess()) {
            return ResponseEntity.ok(Map.of("success", true, "message", result.getMessage()));
        } else if (result.getMessage().contains("vượt quá số lần")) {
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(Map.of("success", false, "message", result.getMessage()));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "message", result.getMessage()));
        }
    }
}
