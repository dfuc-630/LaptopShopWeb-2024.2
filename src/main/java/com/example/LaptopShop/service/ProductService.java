package com.example.LaptopShop.service;

import org.springframework.stereotype.Service;

import com.example.LaptopShop.domain.Product;
import com.example.LaptopShop.repository.ProductRepository;

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
}
