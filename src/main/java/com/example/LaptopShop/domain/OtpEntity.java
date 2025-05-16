package com.example.LaptopShop.domain;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OtpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String phone;
    private String otpCode;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private boolean verified = false;

    private Long userId;
    private Long orderId;
}
