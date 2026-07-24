package com.shopsphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private String name;

    private String brand;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String image1;

    @Column(length = 1000)
    private String image2;

    @Column(length = 1000)
    private String image3;

    private Double brandPrice;

    private Double sellingPrice;

    private Double gst;

    private Double finalPrice;

    private Double discount;

    private Double rating;

    private Boolean active;
}
