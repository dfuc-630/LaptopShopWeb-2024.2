package com.example.LaptopShop.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePinRequest {
    private String oldPin;
    private String newPin;
}
