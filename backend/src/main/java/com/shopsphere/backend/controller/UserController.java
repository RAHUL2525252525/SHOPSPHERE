package com.shopsphere.backend.controller;

import java.util.HashMap;
import java.util.Optional;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shopsphere.backend.entity.User;
import com.shopsphere.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "https://shopsphere-vnpx.vercel.app"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()) {

            return "Email already exists";

        }

        userRepository.save(user);

        return "Registration Successful";

    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        Optional<User> user =
                userRepository.findByEmail(loginUser.getEmail());

        if(user.isPresent()) {

            User dbUser = user.get();

            if(dbUser.getPassword().equals(loginUser.getPassword())) {

                return dbUser;

            }

        }

        return null;

    }

    // Admin - Get All Users
    @GetMapping
    public java.util.List<User> getAllUsers() {

        return userRepository.findAll();

    }

    // Get Profile By Email
    @GetMapping("/profile/{email}")
    public ResponseEntity<?> getProfile(
            @PathVariable String email
    ){

        User user =
        userRepository.findByEmail(email)
        .orElse(null);


        if(user==null){

            return ResponseEntity
            .notFound()
            .build();

        }


        Map<String,Object> response=new HashMap<>();


        response.put("name",user.getName());

        response.put("fullName",user.getName());

        response.put("email",user.getEmail());

        response.put("role",user.getRole());


        return ResponseEntity.ok(response);

    }

    // Update Own Profile By Email
    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestBody User updatedUser
    ){

        User user = userRepository.findByEmail(email).orElse(null);

        if(user == null){

            return ResponseEntity.notFound().build();

        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());

        userRepository.save(user);

        Map<String,Object> response = new HashMap<>();

        response.put("name", user.getName());
        response.put("fullName", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);

    }

    // Update User (Admin - by id, includes password/role)
    @PutMapping("/update/{id}")
    public User updateUser(

            @PathVariable Long id,
            @RequestBody User updatedUser

    ) {

        User user = userRepository.findById(id).orElse(null);

        if(user == null) {

            return null;

        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);

    }

    // Delete User
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {

        userRepository.deleteById(id);

        return "User Deleted Successfully";

    }

}
