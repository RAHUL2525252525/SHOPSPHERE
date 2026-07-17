package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.OrderRequest;
import com.shopsphere.backend.dto.OrderResponse;
import com.shopsphere.backend.entity.Orders;
import com.shopsphere.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Place Order
    @PostMapping("/place")
    public Orders placeOrder(@RequestBody OrderRequest request) {

        return orderService.placeOrder(request);

    }

    // Get All Orders (Admin) — now with items nested in
    @GetMapping
    public List<OrderResponse> getAllOrders() {

        return orderService.getAllOrders();

    }

    // Get User Orders
    @GetMapping("/user/{email}")
    public List<OrderResponse> getUserOrders(@PathVariable String email) {

        return orderService.getUserOrders(email);

    }

    // Get Single Order
    @GetMapping("/{id}")
    public OrderResponse getOrder(@PathVariable Long id) {

        return orderService.getOrder(id);

    }

    // Update Order Status — matches admin page's query param call
    @PutMapping("/status/{id}")
    public Orders updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return orderService.updateStatus(id, status);

    }

    // Cancel Order (user-side, sets status to Cancelled)
    @PutMapping("/cancel/{id}")
    public Orders cancelOrder(@PathVariable Long id) {

        return orderService.cancelOrderStatus(id);

    }

    // Delete Order (admin-side, actually removes it)
    @DeleteMapping("/delete/{id}")
    public void deleteOrder(@PathVariable Long id) {

        orderService.deleteOrder(id);

    }

}