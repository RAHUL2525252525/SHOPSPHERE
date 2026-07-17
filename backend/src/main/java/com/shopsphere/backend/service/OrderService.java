package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.OrderRequest;
import com.shopsphere.backend.dto.OrderResponse;
import com.shopsphere.backend.entity.Cart;
import com.shopsphere.backend.entity.OrderItem;
import com.shopsphere.backend.entity.Orders;
import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.repository.CartRepository;
import com.shopsphere.backend.repository.OrderItemRepository;
import com.shopsphere.backend.repository.OrderRepository;
import com.shopsphere.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Orders placeOrder(OrderRequest request) {

        String userEmail = request.getUserEmail();

        List<Cart> cartList = cartRepository.findByUserEmail(userEmail);

        if (cartList.isEmpty()) {
            return null;
        }

        double totalAmount = 0;

        for (Cart cart : cartList) {

            Product product = productRepository
                    .findById(cart.getProductId())
                    .orElse(null);

            if (product != null) {

                totalAmount +=
                        product.getSellingPrice()
                                * cart.getQuantity();

            }

        }

        Orders order = new Orders();

        order.setUserEmail(userEmail);

        order.setTotalAmount(totalAmount);

        order.setStatus("Pending");

        order.setAddress(request.getAddress());

        order.setCity(request.getCity());

        order.setState(request.getState());

        order.setPincode(request.getPincode());

        order.setPaymentMethod(request.getPaymentMethod());

        order.setOrderDate(LocalDateTime.now());

        Orders savedOrder = orderRepository.save(order);

        for (Cart cart : cartList) {

            Product product = productRepository
                    .findById(cart.getProductId())
                    .orElse(null);

            if (product != null) {

                OrderItem item = new OrderItem();

                item.setOrderId(savedOrder.getId());

                item.setProductId(product.getId());

                item.setQuantity(cart.getQuantity());

                item.setPrice(product.getSellingPrice());

                orderItemRepository.save(item);

            }

        }

        cartRepository.deleteAll(cartList);

        return savedOrder;

    }

    // Builds the nested item list for one order
    private OrderResponse toResponse(Orders order) {

        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());

        List<OrderResponse.OrderItemResponse> itemResponses = items.stream()
                .map(item -> {

                    Product product = productRepository
                            .findById(item.getProductId())
                            .orElse(null);

                    return OrderResponse.OrderItemResponse.builder()
                            .productId(item.getProductId())
                            .productName(product != null ? product.getName() : "Product Removed")
                            .productImage(product != null ? product.getImage1() : null)
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .build();

                })
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .userEmail(order.getUserEmail())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .address(order.getAddress())
                .city(order.getCity())
                .state(order.getState())
                .pincode(order.getPincode())
                .paymentMethod(order.getPaymentMethod())
                .orderDate(order.getOrderDate())
                .items(itemResponses)
                .build();

    }

    public List<OrderResponse> getUserOrders(String email) {

        return orderRepository.findByUserEmail(email)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public List<OrderResponse> getAllOrders() {

        return orderRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public OrderResponse getOrder(Long id) {

        Orders order = orderRepository.findById(id).orElse(null);

        return order != null ? toResponse(order) : null;

    }

    // Admin status update — if status is "Cancelled", delete the order entirely
    // instead of just marking it, so it disappears from the user's order list.
    public Orders updateStatus(Long id, String status) {

        Orders order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return null;
        }

        if ("Cancelled".equalsIgnoreCase(status)) {

            deleteOrder(id);

            return order;
            // Note: this returned object is detached/no longer in the DB —
            // only used so the controller has something non-null to serialize
            // back to the frontend as confirmation.

        }

        order.setStatus(status);

        return orderRepository.save(order);

    }

    // User-side cancel — kept separate; still marks status only (does not delete).
    // Change this too if you want user-initiated cancellation to also delete.
    public Orders cancelOrderStatus(Long id) {

        Orders order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return null;
        }

        order.setStatus("Cancelled");

        return orderRepository.save(order);

    }

    // Admin-side delete — actually removes the row (and its items)
    public void deleteOrder(Long id) {

        List<OrderItem> items = orderItemRepository.findByOrderId(id);

        orderItemRepository.deleteAll(items);

        orderRepository.deleteById(id);

    }

    public Double totalRevenue() {

        return orderRepository.findAll()
                .stream()
                .mapToDouble(Orders::getTotalAmount)
                .sum();

    }

}