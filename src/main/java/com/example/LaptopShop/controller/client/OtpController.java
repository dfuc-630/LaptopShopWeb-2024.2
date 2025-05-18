package com.example.LaptopShop.controller.client;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.domain.dto.OrderDTO;
import com.example.LaptopShop.domain.dto.OrderData;
import com.example.LaptopShop.domain.dto.OtpVerifyRequest;
import com.example.LaptopShop.repository.OrderDTORepository;
import com.example.LaptopShop.service.OtpService;
import com.example.LaptopShop.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor

public class OtpController {

    private final OtpService otpService;
    private final UserService userService;
    private final OrderDTORepository orderDTORepository;

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
            Optional<OrderDTO> optionalOrder = orderDTORepository.findById(request.getOrderId());
            if (optionalOrder.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "Đơn hàng không tồn tại"));
            }

            OrderDTO order = optionalOrder.get();
            ObjectMapper mapper = new ObjectMapper();

            try {
                OrderData data = mapper.readValue(order.getData(), OrderData.class);
                data.setStatus("Xác thực thành công");
                String updatedJson = mapper.writeValueAsString(data);
                order.setData(updatedJson);
                orderDTORepository.save(order);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("success", false, "message", "Không thể cập nhật trạng thái đơn hàng"));
            }
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
