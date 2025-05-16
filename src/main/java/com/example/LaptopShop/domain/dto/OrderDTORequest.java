package com.example.LaptopShop.domain.dto;

public class OrderDTORequest {
    private Long userId;
    private OrderData data;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public OrderData getData() {
        return data;
    }

    public void setData(OrderData data) {
        this.data = data;
    }

}