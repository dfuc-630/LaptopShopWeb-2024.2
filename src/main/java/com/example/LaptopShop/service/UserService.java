package com.example.LaptopShop.service;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String handleHello() {
        return "hello from service of Doan Dai Phuc";
    }

    public User handleSaveUser(User user) {
        User doanphuc = this.userRepository.save(user);
        return doanphuc;
    }
}
