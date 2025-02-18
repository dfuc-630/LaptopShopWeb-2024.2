package com.example.LaptopShop.service;

import java.util.List;

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

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public List<User> getAllUsersByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public User handleSaveUser(User user) {
        User doanphuc = this.userRepository.save(user);
        return doanphuc;
    }
}
