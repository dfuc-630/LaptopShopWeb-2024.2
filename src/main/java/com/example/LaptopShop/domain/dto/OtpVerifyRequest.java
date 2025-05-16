package com.example.LaptopShop.domain.dto;

import lombok.Data;

@Data
public class OtpVerifyRequest {
    private String otp;
    private Long orderId;
}
