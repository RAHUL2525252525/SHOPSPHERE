package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.DashboardResponse;
import com.shopsphere.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardResponse dashboard() {

        return dashboardService.getDashboard();

    }

}