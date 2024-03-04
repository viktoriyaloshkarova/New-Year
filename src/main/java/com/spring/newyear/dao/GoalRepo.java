package com.spring.newyear.dao;

import com.spring.newyear.entities.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface GoalRepo extends JpaRepository<Goal, Integer> {

    Optional<List<Goal>> findAllByUserId(Integer userId);
}
