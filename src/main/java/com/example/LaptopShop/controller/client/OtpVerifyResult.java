package com.example.LaptopShop.controller.client;

public class OtpVerifyResult {
    private boolean success;
    private String message;

    public OtpVerifyResult(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
