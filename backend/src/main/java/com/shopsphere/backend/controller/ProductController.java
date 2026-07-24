package com.shopsphere.backend.controller;

import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService service;

    // Add Product
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        return service.addProduct(product);
    }

    // Get All Products
    @GetMapping
    public List<Product> getProducts(){
        return service.getAllProducts();
    }

    // Get Single Product
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return service.getProduct(id);
    }

    // Search Product
    @GetMapping("/search/{keyword}")
    public List<Product> search(
            @PathVariable String keyword){
        return service.searchProducts(keyword);
    }

    // Category Filter
    @GetMapping("/category/{category}")
    public List<Product> category(
            @PathVariable String category){
        return service.getCategoryProducts(category);
    }

    // Brand Filter
    @GetMapping("/brand/{brand}")
    public List<Product> brand(
            @PathVariable String brand){
        return service.getBrandProducts(brand);
    }

    // Update Product
    @PutMapping("/update/{id}")
    public Product update(
            @PathVariable Long id,
            @RequestBody Product product){
        return service.updateProduct(id,product);
    }

    // Delete Product
    @DeleteMapping("/delete/{id}")
    public void delete(
            @PathVariable Long id){
        service.deleteProduct(id);
    }

    // Upload Product Image From Device
    @PostMapping(
            value="/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String uploadImage(
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String uploadDir="uploads/products/";
        File folder=new File(uploadDir);
        if(!folder.exists()){
            folder.mkdirs();
        }
        String fileName =
                UUID.randomUUID()
                +"_"
                +file.getOriginalFilename();
        File destination =
                new File(uploadDir + fileName);
        file.transferTo(destination);
        return "https://shopsphere-backend-5umn.onrender.com/uploads/products/"
                +fileName;
    }
}
