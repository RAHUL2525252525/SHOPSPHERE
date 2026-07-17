package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUserEmail(String userEmail);

}