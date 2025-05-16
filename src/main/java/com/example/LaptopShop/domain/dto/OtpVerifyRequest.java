package com.example.LaptopShop.domain.dto;

import lombok.Data;

@Data
public class OtpVerifyRequest {
    private Long userId;
    private String otp;
    private Long orderId;
}
