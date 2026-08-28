package com.ecommerce.repository;
import com.ecommerce.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserAccountRepository extends JpaRepository<UserAccount, String> { }
