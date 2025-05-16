package com.example.LaptopShop.domain.dto;

public class ShippingInfo {
    private String name;
    private String phone;
    private String email;
    private String address;
    private String shippingType;
    private String orderNotes;
    private String pickupStore;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getShippingType() {
        return shippingType;
    }

    public void setShippingType(String shippingType) {
        this.shippingType = shippingType;
    }

    public String getOrderNotes() {
        return orderNotes;
    }

    public void setOrderNotes(String orderNotes) {
        this.orderNotes = orderNotes;
    }

    public String getPickupStore() {
        return pickupStore;
    }

    public void setPickupStore(String pickupStore) {
        this.pickupStore = pickupStore;
    }

}
