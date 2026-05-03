package com.ecommerce.service;

import com.ecommerce.dto.RegisterRequest;
import com.ecommerce.entity.User;

public interface AuthService {
    User register(RegisterRequest request);

    String login(String email, String password);
}
