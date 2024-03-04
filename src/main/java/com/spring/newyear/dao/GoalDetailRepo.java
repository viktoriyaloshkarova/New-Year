package com.spring.newyear.dao;

import com.spring.newyear.entities.GoalDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GoalDetailRepo extends JpaRepository<GoalDetail, Integer> {

    Optional<List<GoalDetail>> findAllByGoalId(Integer goalId);

}
