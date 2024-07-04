package com.spring.newyear.controllers;

import com.spring.newyear.dao.GoalRepo;
import com.spring.newyear.entities.Goal;
import com.spring.newyear.entities.GoalDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/goals")
@CrossOrigin
public class GoalController {
    @Autowired
    private GoalRepo goalRepo;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> getAllGoals(@PathVariable("userId") Integer userId) {
        List<Goal> goalList = goalRepo.findAllByUserId(userId).orElse(null);
        if (goalList == null) {
            return new ResponseEntity<List<Goal>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Goal>>(goalList, HttpStatus.OK);
    }

    @GetMapping("/find/{goalId}")
    public ResponseEntity<Goal> getGoal(@PathVariable("goalId") Integer goalId) {
        Goal goal = goalRepo.findById(goalId).orElse(null);
        if (goal == null) {
            return new ResponseEntity<Goal>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Goal>(HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Goal> addGoal(@RequestBody Goal goal) {
        Goal newGoal = goalRepo.save(goal);
        return new ResponseEntity<>(newGoal, HttpStatus.CREATED);
    }

    @PutMapping("/update/{goalId}")
    public ResponseEntity<Goal> updateGoal(@PathVariable("goalId") Integer goalId, @RequestBody Goal updatedGoal){
        Goal goal = goalRepo.findById(goalId).orElse(null);
        if(goal == null){
            return new ResponseEntity<Goal>(HttpStatus.NOT_FOUND);
        } else if (!Objects.equals(updatedGoal.getGoalId(), goalId)) {
            return new ResponseEntity<Goal>(HttpStatus.BAD_REQUEST);
        } else {
            goalRepo.save(updatedGoal);
            return new ResponseEntity<Goal>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{goalId}")
    public ResponseEntity<Void> deleteGoal(@PathVariable("goalId") Integer goalId) {
        goalRepo.deleteById(goalId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

}
