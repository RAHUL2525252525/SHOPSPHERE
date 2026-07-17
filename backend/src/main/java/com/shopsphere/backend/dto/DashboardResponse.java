package com.shopsphere.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Long totalUsers;

    private Long totalProducts;

    private Long totalOrders;

    private Double totalRevenue;

    private Long pendingOrders;

    private Long shippedOrders;

    private Long deliveredOrders;

    private Long cancelledOrders;

}