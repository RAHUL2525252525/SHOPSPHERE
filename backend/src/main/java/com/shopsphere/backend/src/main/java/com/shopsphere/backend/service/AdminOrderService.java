package com.shopsphere.backend.service;

import com.shopsphere.backend.entity.Orders;
import com.shopsphere.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminOrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Orders> getAllOrders() {

        return orderRepository.findAll();

    }

    public Orders getOrder(Long id) {

        return orderRepository.findById(id).orElse(null);

    }

    public Orders updateStatus(Long id, String status) {

        Orders order = orderRepository.findById(id).orElse(null);

        if (order == null) {

            return null;

        }

        order.setStatus(status);

        return orderRepository.save(order);

    }

    public void deleteOrder(Long id) {

        orderRepository.deleteById(id);

    }

    public long totalOrders() {

        return orderRepository.count();

    }

    public double totalRevenue() {

        return orderRepository.findAll()
                .stream()
                .mapToDouble(Orders::getTotalAmount)
                .sum();

    }

}