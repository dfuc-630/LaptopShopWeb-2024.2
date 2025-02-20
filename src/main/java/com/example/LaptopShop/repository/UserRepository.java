package com.example.LaptopShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.LaptopShop.domain.User;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User save(User doanphuc);

    List<User> findByEmail(String email);

    void deleteUserById(long id);
}
