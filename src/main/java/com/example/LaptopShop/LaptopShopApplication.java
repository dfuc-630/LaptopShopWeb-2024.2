package com.example.LaptopShop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
@SpringBootApplication(exclude = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class LaptopShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaptopShopApplication.class, args);
	}

}
