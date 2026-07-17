package com.shopsphere.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {

    private Long cartId;

    private Long productId;

    private String productName;

    private String brand;

    private String image;

    private Double price;

    private Integer quantity;

    private Double total;

}