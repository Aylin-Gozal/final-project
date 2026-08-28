package com.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "clients")
public class Client {
    @Id private String username;
    @Lob private String payload;
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
}
