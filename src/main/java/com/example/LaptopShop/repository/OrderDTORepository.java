package com.example.LaptopShop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.LaptopShop.domain.User;
import com.example.LaptopShop.domain.dto.OrderDTO;

@Repository
public interface OrderDTORepository extends JpaRepository<OrderDTO, Long> {
    List<OrderDTO> findByUser(User user);

    void deleteOrderDTOById(long id);
}