package com.example.LaptopShop.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class OtpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id auto increment
    private Long id;

    private String email;
    private String phone;
    private String otpCode;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private boolean verified = false;

    private Long orderId;

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
