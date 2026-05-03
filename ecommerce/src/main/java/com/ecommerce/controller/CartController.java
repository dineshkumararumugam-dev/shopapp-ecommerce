package com.ecommerce.controller;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.entity.Cart;
import com.ecommerce.service.CartService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // ADD TO CART — email extracted from JWT, not from request body
    @PostMapping
    public ResponseEntity<Cart> addToCart(
            @Valid @RequestBody CartRequest request,
            Authentication auth) {

        String email = auth.getName();
        Cart cart = cartService.addToCart(request, email);
        return ResponseEntity.ok(cart);
    }

    // VIEW MY CART — only returns logged-in user's cart
    @GetMapping
    public ResponseEntity<List<Cart>> getMyCart(Authentication auth) {

        String email = auth.getName();
        List<Cart> cartItems = cartService.getUserCart(email);
        return ResponseEntity.ok(cartItems);
    }

    // REMOVE ITEM — verifies ownership inside service
    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartId,
            Authentication auth) {

        String email = auth.getName();
        cartService.removeCartItem(cartId, email);
        return ResponseEntity.ok("Cart item removed successfully");
    }
}
