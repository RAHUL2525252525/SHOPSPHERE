package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    List<Product> findByNameContainingIgnoreCase(String keyword);
    List<Product> findByActiveTrue();
    List<Product> findByIdIn(List<Long> ids);
}
