package com.example.LaptopShop.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PinRequest { // dành cho nhập mã pin trước khi thanh toán
    private String pin;
}
