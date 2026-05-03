package com.ecommerce.service;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.entity.Cart;

import java.util.List;

public interface CartService {

    Cart addToCart(CartRequest request, String email);

    List<Cart> getUserCart(String email);

    void removeCartItem(Long cartId, String email);
}
