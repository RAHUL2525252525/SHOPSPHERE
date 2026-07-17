package com.shopsphere.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String brand;

    private String category;

    private String subCategory;

    private String description;

    private Double brandPrice;

    private Double sellingPrice;

    private Double gst;

    private Double discount;

    private Double finalPrice;

    private Integer stock;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

    private String image5;

    private String specifications;

    private Double rating;

    private Integer reviews;

    private Boolean active;

}