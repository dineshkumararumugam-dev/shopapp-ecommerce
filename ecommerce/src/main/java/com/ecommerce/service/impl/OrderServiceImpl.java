package com.ecommerce.service.impl;

import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.*;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.*;
import com.ecommerce.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    // PLACE ORDER — server calculates total, sets date/status, decrements stock
    @Override
    @Transactional
    public Order placeOrder(OrderRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Cart> cartItems = new ArrayList<>();

        for (Long cartId : request.getCartIds()) {
            Cart cart = cartRepository.findById(cartId)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Cart item not found: " + cartId));

            // Ownership check — cart item must belong to the logged-in user
            if (!cart.getUser().getEmail().equals(email)) {
                throw new RuntimeException("Access denied: cart item " + cartId + " does not belong to you");
            }

            cartItems.add(cart);
        }

        // Build order items and calculate total server-side
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0;

        for (Cart cart : cartItems) {
            Product product = cart.getProduct();

            // Stock check
            if (product.getStock() < cart.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + product.getName()
                        + ". Available: " + product.getStock());
            }

            // Decrement stock
            product.setStock(product.getStock() - cart.getQuantity());
            productRepository.save(product);

            // Build order item
            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(cart.getQuantity());
            item.setPrice(product.getPrice()); // capture price at time of order

            orderItems.add(item);

            totalAmount += product.getPrice() * cart.getQuantity();
        }

        // Build order — all fields set by server, not client
        Order order = new Order();
        order.setUser(user);
        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        // Link each order item back to the order
        orderItems.forEach(item -> item.setOrder(order));

        Order savedOrder = orderRepository.save(order);

        // Clear cart items after successful order
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    // GET ORDERS — only returns the logged-in user's own orders
    @Override
    public List<Order> getUserOrders(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return orderRepository.findByUser(user);
    }
}
