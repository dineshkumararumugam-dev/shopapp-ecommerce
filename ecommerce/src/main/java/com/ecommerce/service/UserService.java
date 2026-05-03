package com.ecommerce.service;

import com.ecommerce.entity.User;
import java.util.List;

public interface UserService {
    // CREATE
    User registerUser(User user);

    // READ
    User getUserById(Long id);

    // READ ALL
    List<User> getAllUsers();

    // UPDATE
    User updateUser(Long id, User user);

    // DELETE
    void deleteUser(Long id);
}
