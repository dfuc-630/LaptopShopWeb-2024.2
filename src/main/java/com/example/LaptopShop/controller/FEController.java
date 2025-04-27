package com.example.LaptopShop.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.LaptopShop.domain.Product;
import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.repository.UserRepository;
import com.example.LaptopShop.service.ProductService;
import com.example.LaptopShop.service.UserService;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class FEController {
    private final ProductService productService;
    private final UserService userService;

    public FEController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("/data/product")
    public List<Product> getProduct() {
        List<Product> products = this.productService.getAllProducts();
        return products;
    }

    @GetMapping("/data/product/page/{id}")
    public List<Product> getProductPage(@PathVariable long id) {
        List<Product> products = this.productService.getAllProducts();
        int pageSize = 10;
        int fromIndex = (int) ((id - 1) * pageSize);
        int toIndex = Math.min(fromIndex + pageSize, products.size());

        if (fromIndex >= products.size() || fromIndex < 0) {
            return new ArrayList<>();
        }

        return products.subList(fromIndex, toIndex);
    }

    @GetMapping("/data/product/{id}")
    public Product getProductById(@PathVariable long id) {
        Product product = this.productService.getProductById(id);
        return product;
    }

    @GetMapping("/data/product/target/{target}")
    public List<Product> getProductByTarget(@PathVariable String target) {
        List<Product> products = this.productService.getProductByTarget(target);
        return products;
    }

    @GetMapping("/data/userInfo")
    public User getMethodName() {
        String userEmail = UserInfo.userInfo;
        User user = this.userService.getUserByEmail(userEmail);
        return user;
    }

}
