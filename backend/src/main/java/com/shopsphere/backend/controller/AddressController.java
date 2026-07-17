package com.shopsphere.backend.controller;

import com.shopsphere.backend.entity.Address;
import com.shopsphere.backend.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@CrossOrigin("*")
public class AddressController {

    @Autowired
    private AddressService service;

    @PostMapping
    public Address save(@RequestBody Address address) {

        return service.save(address);

    }

    @GetMapping("/{email}")
    public List<Address> getAddresses(
            @PathVariable String email) {

        return service.getAddresses(email);

    }

    @PutMapping("/{id}")
    public Address update(
            @PathVariable Long id,
            @RequestBody Address address) {

        return service.update(id, address);

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        service.delete(id);

    }

}