package com.ecommerce.service;

import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.Order;

import java.util.List;

public interface OrderService {

    Order placeOrder(OrderRequest request, String email);

    List<Order> getUserOrders(String email);
}
