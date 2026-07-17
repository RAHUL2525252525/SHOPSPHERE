package com.shopsphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private Double totalAmount;

    private String status;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String paymentMethod;

    private LocalDateTime orderDate;

}