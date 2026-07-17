package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.DashboardResponse;
import com.shopsphere.backend.entity.Orders;
import com.shopsphere.backend.repository.OrderRepository;
import com.shopsphere.backend.repository.ProductRepository;
import com.shopsphere.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public DashboardResponse getDashboard() {

        long pending = 0;
        long shipped = 0;
        long delivered = 0;
        long cancelled = 0;

        double revenue = 0;

        for (Orders order : orderRepository.findAll()) {

            revenue += order.getTotalAmount();

            if (order.getStatus() == null)
                continue;

            switch (order.getStatus().toLowerCase()) {

                case "pending":
                    pending++;
                    break;

                case "shipped":
                    shipped++;
                    break;

                case "delivered":
                    delivered++;
                    break;

                case "cancelled":
                    cancelled++;
                    break;
            }

        }

        return DashboardResponse.builder()

                .totalUsers(userRepository.count())

                .totalProducts(productRepository.count())

                .totalOrders(orderRepository.count())

                .totalRevenue(revenue)

                .pendingOrders(pending)

                .shippedOrders(shipped)

                .deliveredOrders(delivered)

                .cancelledOrders(cancelled)

                .build();

    }

}