package com.example.LaptopShop.domain.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderData {
    private Long userId;
    private List<Item> items;
    private ShippingInfo shippingInfo;
    private String paymentMethod;
    private boolean wantsEinvoice;
    private long subtotal;
    private long shippingCost;
    private String discountCode;
    private long discountAmount;
    private long totalAmount;
    private String status;
    // private LocalDateTime orderDate;

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public ShippingInfo getShippingInfo() {
        return shippingInfo;
    }

    public void setShippingInfo(ShippingInfo shippingInfo) {
        this.shippingInfo = shippingInfo;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public boolean isWantsEinvoice() {
        return wantsEinvoice;
    }

    public void setWantsEinvoice(boolean wantsEinvoice) {
        this.wantsEinvoice = wantsEinvoice;
    }

    public long getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(long subtotal) {
        this.subtotal = subtotal;
    }

    public long getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(long shippingCost) {
        this.shippingCost = shippingCost;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

    public long getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(long discountAmount) {
        this.discountAmount = discountAmount;
    }

    public long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // public LocalDateTime getOrderDate() {
    // return orderDate;
    // }

    // public void setOrderDate(LocalDateTime orderDate) {
    // this.orderDate = orderDate;
    // }

}
