package com.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserAccount {
    @Id private String username;
    private String password;
    @Lob private String payload;
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
}
