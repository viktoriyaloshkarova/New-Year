package com.spring.newyear.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name="goal_detail")
public class GoalDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer goalDetailId;

    @Column(name="goal_id")
    private Integer goalId;

    @Column(name="text")
    private String text;

    @Column(name="timestamp", columnDefinition="TIMESTAMP", insertable = false, updatable = false)
    private LocalDateTime timestamp;

    public GoalDetail() {}
    public GoalDetail(Integer goalDetailId, Integer goalId, String text, LocalDateTime timestamp) {
        this.goalDetailId = goalDetailId;
        this.goalId = goalId;
        this.text = text;
        this.timestamp = timestamp;
    }

    public Integer getGoalDetailId() {
        return goalDetailId;
    }

    public void setGoalDetailId(Integer goalDetailId) {
        this.goalDetailId = goalDetailId;
    }

    public Integer getGoalId() {
        return goalId;
    }

    public void setGoalId(Integer goalId) {
        this.goalId = goalId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
