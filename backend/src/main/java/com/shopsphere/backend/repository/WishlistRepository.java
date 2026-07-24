package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserEmail(String userEmail);
    Wishlist findByUserEmailAndProductId(String userEmail, Long productId);
}
