package com.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String owner;
    private String customer;
    @Lob private String payload;
    public Long getId() { return id; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public String getCustomer() { return customer; }
    public void setCustomer(String customer) { this.customer = customer; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
}
