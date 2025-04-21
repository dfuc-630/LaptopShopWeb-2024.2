package com.example.LaptopShop.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.LaptopShop.domain.Product;
import com.example.LaptopShop.service.ProductService;

@RestController
public class FEController {
    private final ProductService productService;

    public FEController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/data/product")
    public List<Product> getProduct() {
        List<Product> products = this.productService.getAllProducts();
        return products;
    }

    @GetMapping("/data/product/{id}")
    public Product getProductById(@PathVariable long id) {
        Product product = this.productService.getProductById(id);
        return product;
    }
}
