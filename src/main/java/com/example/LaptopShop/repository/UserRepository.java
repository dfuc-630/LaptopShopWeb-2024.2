package com.example.LaptopShop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.LaptopShop.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User save(User doanphuc);

}
