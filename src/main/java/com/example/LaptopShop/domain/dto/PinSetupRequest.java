package com.example.LaptopShop.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PinSetupRequest { // dành cho thiết lập mã pin khi mới tạo tài khoản
    private String pin;
    private String confirmPin;
}
