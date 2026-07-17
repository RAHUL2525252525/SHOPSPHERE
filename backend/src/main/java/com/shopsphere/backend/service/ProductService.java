package com.shopsphere.backend.service;

import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    // Add Product
    public Product addProduct(Product product) {

        calculatePrice(product);

        return repository.save(product);

    }

    // Get All Products
    public List<Product> getAllProducts() {

        return repository.findAll();

    }

    // Get Product By Id
    public Product getProduct(Long id) {

        return repository.findById(id).orElse(null);

    }

    // Search Products
    public List<Product> searchProducts(String keyword) {

        return repository.findByNameContainingIgnoreCase(keyword);

    }

    // Category Products
    public List<Product> getCategoryProducts(String category) {

        return repository.findByCategory(category);

    }

    // Brand Products
    public List<Product> getBrandProducts(String brand) {

        return repository.findByBrand(brand);

    }

    // Update Product
    public Product updateProduct(Long id, Product product) {

        Product old = repository.findById(id).orElse(null);

        if (old == null) {

            return null;

        }

        product.setId(id);

        calculatePrice(product);

        return repository.save(product);

    }

    // Delete Product
    public void deleteProduct(Long id) {

        repository.deleteById(id);

    }

    // Auto Calculate Price
    private void calculatePrice(Product product) {

        if (product.getBrandPrice() != null &&
                product.getSellingPrice() != null &&
                product.getBrandPrice() > 0) {

            double discount =
                    ((product.getBrandPrice() -
                            product.getSellingPrice())
                            / product.getBrandPrice()) * 100;

            product.setDiscount(
                    Math.round(discount * 100.0) / 100.0
            );

        }

        if (product.getSellingPrice() != null &&
                product.getGst() != null) {

            double finalPrice =
                    product.getSellingPrice() +
                            ((product.getSellingPrice()
                                    * product.getGst()) / 100);

            product.setFinalPrice(
                    Math.round(finalPrice * 100.0) / 100.0
            );

        }

    }

}