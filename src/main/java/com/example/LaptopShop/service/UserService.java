package com.example.LaptopShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.Role;
import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.domain.dto.RegisterDTO;
import com.example.LaptopShop.repository.ProductRepository;
import com.example.LaptopShop.repository.RoleRepository;
import com.example.LaptopShop.repository.UserRepository;
import com.example.LaptopShop.repository.OrderDTORepository;
import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProductRepository productRepository;
    private final OrderDTORepository orderDTORepository;
    public UserService(UserRepository userRepository, RoleRepository roleRepository,
            ProductRepository productRepository, OrderDTORepository orderDTORepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.productRepository = productRepository;
        this.orderDTORepository = orderDTORepository;
    }

    public String handleHello() {
        return "hello from service of Doan Dai Phuc";
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    // public List<User> getAllUsersByEmail(String email) {
    // return this.userRepository.findByEmail(email);
    // }

    public User handleSaveUser(User user) {
        User doanphuc = this.userRepository.save(user);
        return doanphuc;
    }

    public User getUserById(long id) {
        User user = this.userRepository.getById(id);
        return user;
    }

    @Transactional
    public void deleteUserById(long id) {
        this.userRepository.deleteUserById(id);
    }

    public Role getRoleByName(String name) {
        return this.roleRepository.findByName(name);
    }

    public User registerDTOtoUser(RegisterDTO registerDTO) {
        User user = new User();
        user.setFullName(registerDTO.getFullName());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(registerDTO.getPassword());
        return user;
    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public long countUsers() {
        return this.userRepository.count();
    }

    public long countProducts() {
        return this.productRepository.count();
    }

    public long countOrders() {
        return this.orderDTORepository.count() ;
    }
    public List<User> searchUsersByName(String name) {
        return userRepository.findByFullNameContainingIgnoreCase(name);
    }
}

