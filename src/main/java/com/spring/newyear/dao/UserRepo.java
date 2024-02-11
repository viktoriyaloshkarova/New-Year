package com.spring.newyear.dao;

import com.spring.newyear.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepo extends JpaRepository<User, Integer> {


}
