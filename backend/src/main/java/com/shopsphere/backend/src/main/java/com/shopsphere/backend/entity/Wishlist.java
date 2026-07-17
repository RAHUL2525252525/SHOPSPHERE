package com.shopsphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Wishlist {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String userEmail;

private Long productId;

}