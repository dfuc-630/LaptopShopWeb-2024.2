package com.example.LaptopShop.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otpCode, Long orderId) {
        String subject = "Mã OTP xác nhận đơn hàng #" + orderId;
        String body = "Được gửi từ LaptopShopWeb" + "\nMã OTP của bạn là: " + otpCode
                + "\nVui lòng không chia sẻ mã này cho bất kỳ ai.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
