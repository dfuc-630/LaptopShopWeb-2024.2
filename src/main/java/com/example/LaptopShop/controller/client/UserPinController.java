package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.LaptopShop.domain.dto.ChangePinRequest;
import com.example.LaptopShop.domain.dto.PinRequest;
import com.example.LaptopShop.domain.dto.PinSetupRequest;
import com.example.LaptopShop.service.PinService;
import com.example.LaptopShop.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/pin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")

public class UserPinController {
      private static final Logger logger = LoggerFactory.getLogger(UserPinController.class);

    private final UserService userService;
    private final PinService pinService;

     @PostMapping("/setup")
    public ResponseEntity<Map<String, String>> setPin(@RequestBody PinSetupRequest request, Principal principal) {
        Map<String, String> response = new HashMap<>();
        logger.info("POST /user/pin/setup called by user: {}", principal != null ? principal.getName() : "anonymous");

        if (principal == null) {
            logger.warn("Attempt to setup PIN without login");
            response.put("message", "Bạn chưa đăng nhập");
            return ResponseEntity.status(403).body(response);
        }

        String pin = request.getPin();
        String confirmPin = request.getConfirmPin();

        logger.debug("Setup PIN for user {}: pin={}, confirmPin={}", principal.getName(), pin, confirmPin);

        if (pin == null || !pin.matches("\\d{6}")) {
            logger.warn("Invalid PIN format by user {}", principal.getName());
            response.put("message", "Mã PIN không hợp lệ. Phải đúng 6 chữ số.");
            return ResponseEntity.badRequest().body(response);
        }

        if (!pin.equals(confirmPin)) {
            logger.warn("PIN confirmation mismatch by user {}", principal.getName());
            response.put("message", "Mã PIN xác nhận không khớp.");
            return ResponseEntity.badRequest().body(response);
        }

        userService.setUserPin(principal.getName(), pin);
        logger.info("PIN setup successful for user {}", principal.getName());
        response.put("message", "Thiết lập mã PIN thành công");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyUserPin(@RequestBody PinRequest request, Principal principal) {
        Map<String, String> response = new HashMap<>();

        if (principal == null) {
            response.put("message", "Bạn chưa đăng nhập");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        String email = principal.getName();

        try {
            if (pinService.isBlocked(email)) {
                response.put("message", "Tài khoản bị khóa do nhập sai mã PIN quá 5 lần.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            boolean success = pinService.verifyPin(email, request.getPin());

            if (success) {
                response.put("message", "Xác thực mã PIN thành công.");
                return ResponseEntity.ok(response);
            } else {
                int remaining = pinService.getRemainingAttempts(email);
                response.put("message", "Sai mã PIN. Bạn còn " + remaining + " lần thử.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (IllegalArgumentException | IllegalStateException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, String>> changePin(@RequestBody ChangePinRequest request, Principal principal) {
        Map<String, String> response = new HashMap<>();

        if (principal == null) {
            response.put("message", "Bạn chưa đăng nhập");
            return ResponseEntity.status(403).body(response);
        }

        String email = principal.getName();
        String oldPin = request.getOldPin();
        String newPin = request.getNewPin();

        if (newPin == null || !newPin.matches("\\d{6}")) {
            response.put("message", "Mã PIN mới không hợp lệ. Phải đúng 6 chữ số.");
            return ResponseEntity.badRequest().body(response);
        }

        if (!pinService.verifyPin(email, oldPin)) {
            response.put("message", "Mã PIN hiện tại không đúng.");
            return ResponseEntity.status(401).body(response);
        }

        pinService.setUserPin(email, newPin);
        response.put("message", "Đổi mã PIN thành công.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/has")
    public ResponseEntity<Map<String, Boolean>> hasPin(Principal principal) {
        Map<String, Boolean> response = new HashMap<>();
        if (principal == null) {
            response.put("hasPin", false);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
        String email = principal.getName();
        boolean hasPin = pinService.hasPin(email);
        response.put("hasPin", hasPin);
        return ResponseEntity.ok(response);
    }
}
