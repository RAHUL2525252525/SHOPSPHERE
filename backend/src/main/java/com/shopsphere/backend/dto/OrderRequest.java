package com.shopsphere.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true) // ignores "products" field sent by frontend
public class OrderRequest {

    private String userEmail;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String paymentMethod;

}