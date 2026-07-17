package com.shopsphere.backend.service;

import com.shopsphere.backend.entity.User;
import com.shopsphere.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    public User getUser(Long id) {

        return userRepository.findById(id).orElse(null);

    }

    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email).orElse(null);

    }

    public User changeRole(Long id, String role) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {

            return null;

        }

        user.setRole(role);

        return userRepository.save(user);

    }

    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }

}