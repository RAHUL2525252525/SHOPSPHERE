package com.shopsphere.backend.service;

import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {

        return productRepository.findAll();

    }

    public Product getProduct(Long id) {

        return productRepository.findById(id).orElse(null);

    }

    public Product addProduct(Product product) {

        return productRepository.save(product);

    }

    public Product updateProduct(Long id, Product product) {

        Product old = productRepository.findById(id).orElse(null);

        if (old == null) {

            return null;

        }

        product.setId(id);

        return productRepository.save(product);

    }

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);

    }

    public Product changeStatus(Long id, boolean active) {

        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {

            return null;

        }

        product.setActive(active);

        return productRepository.save(product);

    }

    public List<Product> search(String keyword) {

        return productRepository.findByNameContainingIgnoreCase(keyword);

    }

}