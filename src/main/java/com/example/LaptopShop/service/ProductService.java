package com.example.LaptopShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.Product;
import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    final private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product handleSaveProduct(Product product) {
        Product doanphuc = this.productRepository.save(product);
        return product;
    }

    public List<Product> getAllProducts() {
        List<Product> products = this.productRepository.findAll();
        return products;
    }

    public Product getProductById(Long id) {
        Product product = this.productRepository.getById(id);
        return product;
    }

    @Transactional
    public void deleteProductById(long id) {
        this.productRepository.deleteProductById(id);
    }

    public List<Product> getProductByTarget(String target) {
        List<Product> products = this.productRepository.getProductByTarget(target);
        return products;
    }

    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
}
