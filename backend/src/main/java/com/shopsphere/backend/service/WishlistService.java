package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.WishlistResponse;
import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.entity.Wishlist;
import com.shopsphere.backend.repository.ProductRepository;
import com.shopsphere.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    public Wishlist add(Wishlist wishlist) {
        Wishlist existing = wishlistRepository.findByUserEmailAndProductId(
                wishlist.getUserEmail(),
                wishlist.getProductId()
        );
        if (existing != null) {
            return existing;
        }
        return wishlistRepository.save(wishlist);
    }

    public List<WishlistResponse> getWishlist(String email) {
        List<Wishlist> list = wishlistRepository.findByUserEmail(email);

        List<Long> productIds = list.stream()
                .map(Wishlist::getProductId)
                .toList();

        Map<Long, Product> productMap = productRepository.findByIdIn(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        List<WishlistResponse> response = new ArrayList<>();
        for (Wishlist item : list) {
            Product product = productMap.get(item.getProductId());
            if (product != null) {
                double discount = 0;
                if (product.getBrandPrice() != null &&
                        product.getSellingPrice() != null &&
                        product.getBrandPrice() > 0) {
                    discount =
                            ((product.getBrandPrice() - product.getSellingPrice())
                                    / product.getBrandPrice()) * 100;
                }
                response.add(
                        WishlistResponse.builder()
                                .wishlistId(item.getId())
                                .productId(product.getId())
                                .productName(product.getName())
                                .brand(product.getBrand())
                                .image(product.getImage1())
                                .sellingPrice(product.getSellingPrice())
                                .brandPrice(product.getBrandPrice())
                                .discount((double) Math.round(discount))
                                .rating(
                                        product.getRating() != null
                                                ? product.getRating()
                                                : 0.0
                                )
                                .build()
                );
            }
        }
        return response;
    }

    public void remove(Long id) {
        wishlistRepository.deleteById(id);
    }
}
