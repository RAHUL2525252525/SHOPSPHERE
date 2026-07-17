package com.shopsphere.backend.dto;


public class ProductRequest {


    private String name;

    private String brand;

    private String description;


    private double originalPrice;

    private double sellingPrice;

    private double discount;


    private String image;

    private String image2;

    private String image3;

    private String image4;

    private String image5;


    private String category;


    private int stock;


    private String status;


    private String specifications;




    public ProductRequest(){}




    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name=name;
    }




    public String getBrand() {
        return brand;
    }


    public void setBrand(String brand) {
        this.brand=brand;
    }




    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description=description;
    }





    public double getOriginalPrice() {
        return originalPrice;
    }


    public void setOriginalPrice(double originalPrice) {
        this.originalPrice=originalPrice;
    }




    public double getSellingPrice() {
        return sellingPrice;
    }


    public void setSellingPrice(double sellingPrice) {
        this.sellingPrice=sellingPrice;
    }





    public double getDiscount() {
        return discount;
    }


    public void setDiscount(double discount) {
        this.discount=discount;
    }





    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image=image;
    }





    public String getImage2() {
        return image2;
    }


    public void setImage2(String image2) {
        this.image2=image2;
    }





    public String getImage3() {
        return image3;
    }


    public void setImage3(String image3) {
        this.image3=image3;
    }





    public String getImage4() {
        return image4;
    }


    public void setImage4(String image4) {
        this.image4=image4;
    }





    public String getImage5() {
        return image5;
    }


    public void setImage5(String image5) {
        this.image5=image5;
    }





    public String getCategory() {
        return category;
    }


    public void setCategory(String category) {
        this.category=category;
    }





    public int getStock() {
        return stock;
    }


    public void setStock(int stock) {
        this.stock=stock;
    }





    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status=status;
    }





    public String getSpecifications() {
        return specifications;
    }


    public void setSpecifications(String specifications) {
        this.specifications=specifications;
    }


}