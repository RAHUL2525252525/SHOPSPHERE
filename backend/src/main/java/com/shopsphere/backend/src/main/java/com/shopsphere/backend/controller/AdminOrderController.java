package com.shopsphere.backend.controller;

import com.shopsphere.backend.entity.Orders;
import com.shopsphere.backend.service.AdminOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin("*")
public class AdminOrderController {

    @Autowired
    private AdminOrderService service;

    @GetMapping
    public List<Orders> getAllOrders() {

        return service.getAllOrders();

    }

    @GetMapping("/{id}")
    public Orders getOrder(
            @PathVariable Long id) {

        return service.getOrder(id);

    }

    @PutMapping("/{id}/status")
    public Orders updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return service.updateStatus(id, status);

    }

    @DeleteMapping("/{id}")
    public void deleteOrder(
            @PathVariable Long id) {

        service.deleteOrder(id);

    }

    @GetMapping("/count")
    public long totalOrders() {

        return service.totalOrders();

    }

    @GetMapping("/revenue")
    public double revenue() {

        return service.totalRevenue();

    }

}