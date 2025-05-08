package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class UserPinController {

    private final UserService userService;
    private final PinService pinService;

    @PostMapping("/setup")
    public ResponseEntity<String> setPin(@RequestBody PinSetupRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(403).body("Bạn chưa đăng nhập");
        }

        String pin = request.getPin();
        String confirmPin = request.getConfirmPin();

        if (pin == null || !pin.matches("\\d{6}")) {
            return ResponseEntity.badRequest().body("Mã PIN không hợp lệ. Phải đúng 6 chữ số.");
        }

        if (!pin.equals(confirmPin)) {
            return ResponseEntity.badRequest().body("Mã PIN xác nhận không khớp.");
        }

        userService.setUserPin(principal.getName(), pin);
        return ResponseEntity.ok("Thiết lập mã PIN thành công");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUserPin(@RequestBody PinRequest request, Principal principal) {
        if (principal == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn chưa đăng nhập");

        String email = principal.getName();

        if (pinService.isBlocked(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Tài khoản bị khóa do nhập sai mã PIN quá 5 lần. Vui lòng liên hệ CSKH");
        }

        boolean success = pinService.verifyPin(email, request.getPin());

        if (success) {
            return ResponseEntity.ok("Xác thực mã PIN thành công.");
        } else {
            int remaining = pinService.getRemainingAttempts(email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sai mã PIN. Bạn còn " + remaining + " lần thử.");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> changePin(@RequestBody ChangePinRequest request, Principal principal) {
        if (principal == null)
            return ResponseEntity.status(403).body("Bạn chưa đăng nhập");

        String email = principal.getName();
        String oldPin = request.getOldPin();
        String newPin = request.getNewPin();

        if (newPin == null || !newPin.matches("\\d{6}")) {
            return ResponseEntity.badRequest().body("Mã PIN mới không hợp lệ. Phải đúng 6 chữ số.");
        }

        if (!pinService.verifyPin(email, oldPin)) {
            return ResponseEntity.status(401).body("Mã PIN hiện tại không đúng.");
        }

        pinService.setUserPin(email, newPin);
        return ResponseEntity.ok("Đổi mã PIN thành công.");
    }
}
