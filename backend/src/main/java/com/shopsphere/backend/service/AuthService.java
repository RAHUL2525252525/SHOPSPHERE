package com.shopsphere.backend.service;

import com.shopsphere.backend.entity.User;
import com.shopsphere.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;


    public User register(User user) {

        String normalizedEmail = user.getEmail().trim().toLowerCase();
        user.setEmail(normalizedEmail);

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new RuntimeException("Email already exists");
        }

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        if (user.getEnabled() == null) {
            user.setEnabled(true);
        }

        return userRepository.save(user);
    }


    public User login(String email, String password) {

        String normalizedEmail = email.trim().toLowerCase();

        Optional<User> optionalUser =
                userRepository.findByEmail(normalizedEmail);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid Email");
        }

        User user = optionalUser.get();

        if (Boolean.FALSE.equals(user.getEnabled())) {
            throw new RuntimeException("Account Disabled");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }


    public String forgotPassword(String email) {

        String normalizedEmail = email.trim().toLowerCase();

        Optional<User> optionalUser =
                userRepository.findByEmail(normalizedEmail);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        return "Account found. You can reset password.";
    }


    public User resetPassword(String email, String newPassword) {

        String normalizedEmail = email.trim().toLowerCase();

        Optional<User> optionalUser =
                userRepository.findByEmail(normalizedEmail);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        User user = optionalUser.get();

        user.setPassword(newPassword);

        return userRepository.save(user);
    }
}