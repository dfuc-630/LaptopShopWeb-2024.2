package com.example.LaptopShop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LaptopShop.domain.OtpEntity;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    Optional<OtpEntity> findByEmailAndOtpCodeAndOrderId(String email, String otpCode, Long orderId);
}