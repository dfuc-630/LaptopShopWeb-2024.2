package com.example.LaptopShop.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import ch.qos.logback.core.model.Model;

@Controller
public class ItemController {

    @GetMapping("/product/{id}")
    public String getProductPage(Model model, @PathVariable long id) {
        return "client/product/detail";
    }

}
