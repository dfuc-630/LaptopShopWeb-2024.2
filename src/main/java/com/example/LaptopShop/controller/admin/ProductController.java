package com.example.LaptopShop.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.LaptopShop.domain.Product;

import com.example.LaptopShop.service.ProductService;

@Controller
public class ProductController {
    // private final ProductService productService;

    // public ProductController(ProductService productService) {
    // this.productService = productService;
    // }

    @GetMapping("/admin/product")
    public String getProduct() {
        return "admin/product/show";
    }

    @GetMapping("/admin/product/create")
    public String createProductPage(Model model) {
        model.addAttribute("newProduct", new Product());
        return "admin/product/create";
    }
}
