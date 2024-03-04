package com.spring.newyear.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="goal")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer goalId;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="title")
    private String title;

    @Column(name="due_date")
    private LocalDate dueDate;

    @Column(name="category")
    private String category;

    @Column(name="progress")
    private Float progress;

    @Column(name="timestamp", columnDefinition = "TIMESTAMP", insertable = false, updatable = false)
    private LocalDateTime timestamp;

    public Goal() {}
    public Goal(Integer goalId, Integer userId, String title, LocalDate dueDate, String category, Float progress, LocalDateTime timestamp) {
        this.goalId = goalId;
        this.userId = userId;
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
        this.progress = progress;
        this.timestamp = timestamp;
    }

    public Integer getGoalId() {
        return goalId;
    }

    public void setGoalId(Integer goalId) {
        this.goalId = goalId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Float getProgress() {
        return progress;
    }

    public void setProgress(Float progress) {
        this.progress = progress;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
