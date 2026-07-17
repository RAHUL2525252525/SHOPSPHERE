package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {

    List<Cart> findByUserEmail(String userEmail);

    Cart findByUserEmailAndProductId(String userEmail,
                                     Long productId);

}