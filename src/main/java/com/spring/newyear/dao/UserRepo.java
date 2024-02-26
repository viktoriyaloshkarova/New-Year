package com.spring.newyear.dao;

import com.spring.newyear.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

}
