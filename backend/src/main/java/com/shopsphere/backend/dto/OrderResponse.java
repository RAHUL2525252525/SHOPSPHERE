package com.shopsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

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

    private List<OrderItemResponse> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {

        private Long productId;

        private String productName;

        private String productImage;

        private Integer quantity;

        private Double price;

    }

}