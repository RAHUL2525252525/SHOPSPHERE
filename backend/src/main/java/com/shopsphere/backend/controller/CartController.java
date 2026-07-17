package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.CartResponse;
import com.shopsphere.backend.entity.Cart;
import com.shopsphere.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.shopsphere.backend.dto.CartResponse;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping("/add")
    public Cart add(@RequestBody Cart cart){

        return service.addToCart(cart);

    }

    @GetMapping("/{email}")
    public List<CartResponse> getCart(
        @PathVariable String email){

    return service.getCart(email);

    }

    @PutMapping("/update/{id}")
    public Cart update(
            @PathVariable Long id,
            @RequestParam Integer quantity){

        return service.updateQuantity(id,quantity);

    }

    @DeleteMapping("/remove/{id}")
    public void remove(
            @PathVariable Long id){

        service.removeItem(id);

    }

    @DeleteMapping("/clear/{email}")
    public void clear(
            @PathVariable String email){

        service.clearCart(email);

    }

}