package com.spring.newyear.controllers;

import com.spring.newyear.dao.GoalDetailRepo;
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
@RequestMapping("/goaldetails")
@CrossOrigin
public class GoalDetailController {
    @Autowired
    private GoalDetailRepo gdRepo;

    @GetMapping("/goal/{goalId}")
    public ResponseEntity<List<GoalDetail>> getGoalDetails(@PathVariable("goalId") Integer goalId){
        List<GoalDetail> goalDetails = gdRepo.findAllByGoalId(goalId).orElse(null);
        if(goalDetails == null){
            return new ResponseEntity<List<GoalDetail>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<GoalDetail>>(goalDetails, HttpStatus.OK);
    }

    @GetMapping("/find/{goalDetailId}")
    public ResponseEntity<GoalDetail> getGoalDetail(@PathVariable("goalDetailId") Integer goalDetailId){
        GoalDetail goalDetail = gdRepo.findById(goalDetailId).orElse(null);
        if(goalDetail == null){
            return new ResponseEntity<GoalDetail>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<GoalDetail>(goalDetail, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addGoalDetail(@RequestBody GoalDetail goalDetail){
        gdRepo.save(goalDetail);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{goalDetailId}")
    public ResponseEntity<Void> updateGoalDetail(@PathVariable("goalDetailId") Integer goalDetailId, @RequestBody GoalDetail updatedGoalDetail){
        GoalDetail goalDetail = gdRepo.findById(goalDetailId).orElse(null);
        if(goalDetail == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (!Objects.equals(updatedGoalDetail.getGoalDetailId(), goalDetailId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            gdRepo.save(updatedGoalDetail);
            return new ResponseEntity<>(HttpStatus.OK);
        }

    }

    @DeleteMapping("/delete/{goalDetailId}")
    public ResponseEntity<Void> deleteGoalDetail(@PathVariable("goalDetailId") Integer goalDetailId){
        gdRepo.deleteById(goalDetailId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
