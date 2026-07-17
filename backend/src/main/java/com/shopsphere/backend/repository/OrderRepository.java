package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders,Long> {

    List<Orders> findByUserEmail(String email);

}