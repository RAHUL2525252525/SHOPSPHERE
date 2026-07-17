package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.CartResponse;
import com.shopsphere.backend.entity.Cart;
import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.repository.CartRepository;
import com.shopsphere.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Cart cart){

        Cart old=
                cartRepository.findByUserEmailAndProductId(
                        cart.getUserEmail(),
                        cart.getProductId()
                );

        if(old!=null){

            old.setQuantity(
                    old.getQuantity()+cart.getQuantity()
            );

            return cartRepository.save(old);

        }

        return cartRepository.save(cart);

    }

    public List<CartResponse> getCart(String email){

        List<Cart> carts=
                cartRepository.findByUserEmail(email);

        List<CartResponse> response=
                new ArrayList<>();

        for(Cart cart:carts){

            Product product=
                    productRepository.findById(
                            cart.getProductId()
                    ).orElse(null);

            if(product!=null){

                response.add(

                        CartResponse.builder()

                                .cartId(cart.getId())

                                .productId(product.getId())

                                .productName(product.getName())

                                .brand(product.getBrand())

                                .image(product.getImage1())

                                .price(product.getSellingPrice())

                                .quantity(cart.getQuantity())

                                .total(
                                        product.getSellingPrice()
                                                *
                                                cart.getQuantity()
                                )

                                .build()

                );

            }

        }

        return response;

    }

    public Cart updateQuantity(Long id,Integer quantity){

        Cart cart=
                cartRepository.findById(id).orElse(null);

        if(cart==null){

            return null;

        }

        cart.setQuantity(quantity);

        return cartRepository.save(cart);

    }

    public void remove(Long id){

        cartRepository.deleteById(id);

    }

    public void clear(String email){

        List<Cart> list=
                cartRepository.findByUserEmail(email);

        cartRepository.deleteAll(list);

    }

    public void removeItem(Long id) {

    cartRepository.deleteById(id);

}


public void clearCart(String email) {

    List<Cart> carts = cartRepository.findByUserEmail(email);

    cartRepository.deleteAll(carts);

}

}