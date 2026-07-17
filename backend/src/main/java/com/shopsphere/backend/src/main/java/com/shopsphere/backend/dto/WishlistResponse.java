package com.shopsphere.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistResponse {

    private Long wishlistId;

    private Long productId;

    private String productName;

    private String brand;

    private String image;

    private Double sellingPrice;

    private Double brandPrice;

    private Double discount;

    private Double rating;

}