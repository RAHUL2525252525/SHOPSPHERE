package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.WishlistResponse;
import com.shopsphere.backend.entity.Wishlist;
import com.shopsphere.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin("*")
public class WishlistController {

    @Autowired
    private WishlistService service;

    @PostMapping("/add")
    public Wishlist add(@RequestBody Wishlist wishlist) {

        return service.add(wishlist);

    }

    @GetMapping("/{email}")
    public List<WishlistResponse> getWishlist(
            @PathVariable String email) {

        return service.getWishlist(email);

    }

    @DeleteMapping("/remove/{id}")
    public void remove(@PathVariable Long id) {

        service.remove(id);

    }

}