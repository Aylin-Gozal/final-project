package com.ecommerce.repository;
import com.ecommerce.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> { List<CustomerOrder> findByOwner(String owner); List<CustomerOrder> findByCustomer(String customer); }
