package com.example.LaptopShop.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.LaptopShop.domain.Product;
import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.domain.dto.OrderDTO;
import com.example.LaptopShop.domain.dto.OrderDTORequest;
import com.example.LaptopShop.domain.dto.OrderData;
import com.example.LaptopShop.repository.OrderDTORepository;
import com.example.LaptopShop.repository.UserRepository;
import com.example.LaptopShop.service.ProductService;
import com.example.LaptopShop.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
        if (user == null) {
            return null;
        }
        return user;
    }

    @GetMapping("/data/product/search/{name}")
    public List<Product> getProductByName(@PathVariable String name) {
        return productService.searchProductsByName(name);
    }

    @Autowired
    private OrderDTORepository orderDTORepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/data/order/submit")
    public ResponseEntity<?> postMethodName(@RequestBody OrderDTORequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        OrderDTO order = new OrderDTO();
        order.setUser(user);
        ObjectMapper mapper = new ObjectMapper();
        try {
            String jsonData = mapper.writeValueAsString(request.getData()); // Chuyển OrderData → String JSON
            order.setData(jsonData);
            orderDTORepository.save(order);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "message", "Dữ liệu đơn hàng không hợp lệ"));
        }

        return ResponseEntity.ok(Map.of("success", true, "message", "Đơn hàng đã tạo"));

    }

    @GetMapping("/data/order/{userId}")
    public List<OrderDTO> getMethodName(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<OrderDTO> orders = orderDTORepository.findByUser(user);
        return orders;
    }

}
