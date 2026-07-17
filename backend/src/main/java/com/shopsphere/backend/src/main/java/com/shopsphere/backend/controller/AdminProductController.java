package com.shopsphere.backend.controller;

import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin("*")
public class AdminProductController {

    @Autowired
    private AdminProductService service;

    @GetMapping
    public List<Product> getAllProducts() {

        return service.getAllProducts();

    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {

        return service.getProduct(id);

    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {

        return service.addProduct(product);

    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return service.updateProduct(id, product);

    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {

        service.deleteProduct(id);

    }

    @PutMapping("/{id}/status")
    public Product updateStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {

        return service.changeStatus(id, active);

    }

    @GetMapping("/search")
    public List<Product> search(
            @RequestParam String keyword) {

        return service.search(keyword);

    }

}