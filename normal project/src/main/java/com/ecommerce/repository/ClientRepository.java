package com.ecommerce.repository;
import com.ecommerce.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ClientRepository extends JpaRepository<Client, String> { }
