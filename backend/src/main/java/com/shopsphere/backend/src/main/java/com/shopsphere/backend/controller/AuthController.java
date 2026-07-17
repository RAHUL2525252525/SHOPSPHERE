package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.LoginRequest;
import com.shopsphere.backend.dto.LoginResponse;
import com.shopsphere.backend.dto.RegisterRequest;
import com.shopsphere.backend.dto.ForgotPasswordRequest;
import com.shopsphere.backend.entity.User;
import com.shopsphere.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());

        user.setRole("USER");

        user.setEnabled(true);

        authService.register(user);

        return "Registration Successful";

    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        LoginResponse response = new LoginResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setToken("shopsphere-token");

        return response;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {

        try {

            authService.resetPassword(request.getEmail(), request.getNewPassword());

            return ResponseEntity.ok("Password updated successfully");

        }
        catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }

    }

}