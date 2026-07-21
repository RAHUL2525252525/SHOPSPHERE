package com.shopsphere.backend.controller;


import com.shopsphere.backend.entity.User;
import com.shopsphere.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = {"http://localhost:5173", "https://shopsphere-vnpx.vercel.app"})
public class AdminUserController {


    @Autowired
    private UserRepository userRepository;



    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){

        return ResponseEntity.ok(
                userRepository.findAll()
        );

    }




    // Update user role
    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateRole(
            @PathVariable Long id,
            @RequestParam String role
    ){

        User user =
                userRepository.findById(id)
                .orElse(null);


        if(user == null){

            return ResponseEntity.notFound().build();

        }


        user.setRole(role);


        return ResponseEntity.ok(
                userRepository.save(user)
        );

    }





    // Enable / Disable user
    @PutMapping("/{id}/status")
    public ResponseEntity<User> updateStatus(
            @PathVariable Long id,
            @RequestParam Boolean enabled
    ){


        User user =
                userRepository.findById(id)
                .orElse(null);



        if(user == null){

            return ResponseEntity.notFound().build();

        }



        user.setEnabled(enabled);



        return ResponseEntity.ok(
                userRepository.save(user)
        );


    }





    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id
    ){


        if(!userRepository.existsById(id)){

            return ResponseEntity
                    .notFound()
                    .build();

        }


        userRepository.deleteById(id);


        return ResponseEntity.ok(
                "User deleted successfully"
        );

    }

}
