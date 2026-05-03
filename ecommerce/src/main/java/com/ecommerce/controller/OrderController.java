package com.ecommerce.controller;

import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.Order;
import com.ecommerce.service.OrderService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // PLACE ORDER — email from JWT, not from request body
    @PostMapping
    public ResponseEntity<Order> placeOrder(
            @Valid @RequestBody OrderRequest request,
            Authentication auth) {

        String email = auth.getName();
        Order order = orderService.placeOrder(request, email);
        return ResponseEntity.ok(order);
    }

    // GET MY ORDERS — only returns logged-in user's own orders
    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(Authentication auth) {

        String email = auth.getName();
        List<Order> orders = orderService.getUserOrders(email);
        return ResponseEntity.ok(orders);
    }
}
