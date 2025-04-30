package com.example.LaptopShop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.LaptopShop.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product save(Product doanphuc);

    void deleteProductById(long id);

    List<Product> getProductByTarget(String target);
    // List<User> findByEmail(String email);

    // void deleteUserById(long id);
    List<Product> findByNameContainingIgnoreCase(String name);

}
