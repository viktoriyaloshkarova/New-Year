import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './CreateGoal.css';

const categories = [
    "spiritual",
    "financial",
    "career",
    "intellectual",
    "health/wellness",
    "social"
];

function CreateGoal({ show, handleClose, updateGoals }) {
    const [goalTitle, setGoalTitle] = useState('');
    const [goalCategory, setGoalCategory] = useState('');
    const [goalDetails, setGoalDetails] = useState([{ text: '' }]);
    const userId = useSelector((state) => state.user.user.id); // Get userId from Redux store

    const handleAddGoal = async () => {
        if (goalTitle.trim() && goalCategory.trim()) {
            try {
                const newGoal = {
                    userId, // Include userId
                    title: goalTitle,
                    dueDate: '2024-01-01', // Example due date, replace with actual input if needed
                    category: goalCategory,
                    progress: 0 // Initial progress can be zero
                };

                // Create the goal
                const goalResponse = await axios.post("http://localhost:8080/goals/add", newGoal);
                const newGoalData = goalResponse.data;

                // Filter out empty details
                const validDetails = goalDetails.filter(detail => detail.text.trim());
                if (validDetails.length > 0) {
                    const detailsPromises = validDetails.map(detail =>
                        axios.post("http://localhost:8080/goaldetails/add", {
                            goalId: newGoalData.goalId, // Include goalId
                            progress: 0, // Set progress to 0
                            text: detail.text
                        })
                    );
                    await Promise.all(detailsPromises);
                }

                // Call the callback to update goals in parent component
                updateGoals({
                    ...newGoalData,
                    details: validDetails
                });

                // Reset form and close modal
                setGoalTitle('');
                setGoalCategory('');
                setGoalDetails([{ text: '' }]);
                handleClose(); // Close the modal
            } catch (error) {
                console.error('Failed to add goal:', error);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleDetailChange = (index, e) => {
        const { value } = e.target;
        setGoalDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = { text: value }; // Update text only
            return updatedDetails;
        });
    };

    const handleAddDetail = () => {
        setGoalDetails(prevDetails => [...prevDetails, { text: '' }]);
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName='custom-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Add New Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formGoalTitle">
                        <Form.Label><b>Goal Title</b></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter goal title"
                            value={goalTitle}
                            onChange={(e) => setGoalTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGoalCategory">
                        <Form.Label><br/><b>Goal Category</b></Form.Label>
                        <Form.Control
                            as="select"
                            value={goalCategory}
                            onChange={(e) => setGoalCategory(e.target.value)}
                        >
                            <option value="">Select category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGoalDetails">
                        <Form.Label>
                        <br/><b>SMART goals: Specific, Measurable, Achievable, Relevant, Time-Bound </b> 
                        <br/> How are you going to achieve this goal? List some steps (you can modify these as you go). This is how your progress is going to be measured
                        </Form.Label>
                        {goalDetails.map((detail, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <Form.Control
                                    type="text"
                                    placeholder={`Detail ${index + 1} text`}
                                    value={detail.text}
                                    onChange={(e) => handleDetailChange(index, e)}
                                />
                            </div>
                        ))}
                        <Button variant="addNewDetail" onClick={handleAddDetail}>Add Another Detail</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="closeGoal" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="newGoal" onClick={handleAddGoal}>
                    Add Goal
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGoal;