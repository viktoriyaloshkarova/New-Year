import { useState, useEffect } from "react";
import { Button, Accordion, Form, ProgressBar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaPen, FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import './/Goals.css'
import CreateGoal from "../../components/CreateGoal/CreateGoal";
import DeleteModal from "../../components/DeleteModal";

function Goals() {
    const [goals, setGoals] = useState([]);
    const [editableText, setEditableText] = useState('');
    const [progress, setProgress] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [goalDetails, setGoalDetails] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState(null)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    useEffect(() => {
        const fetchGoals = async => {
            if (isLoggedIn) {
                axios.get("http://localhost:8080/goals/user/" + user.id)
                .then((response) => {
                    setGoals(response.data);
                    if(response.data) {
                        response.data.map((goal) => (
                            axios.get("http://localhost:8080/goaldetails/goal/" + goal.goalId)
                            .then((response) => {
                                console.log('inside')
                                let resp = response.data
                                // goal['details'] = resp
                                setGoalDetails(goalDetails=> ({
                                    ...goalDetails, [goal.goalId]: resp
                                }))
                        }))
                        )
                    }
                })
            }}  
            fetchGoals();
    }, [])


  
    const handleIncrease = (detail, goal) => {
      // Update progress on button click
        if(detail.progress < 100) {
            setProgress({ ...progress, [detail.goalDetailId]: detail.progress+10 });
            detail['progress'] += 10
            axios.put("http://localhost:8080/goaldetails/update/" + detail.goalDetailId, detail)
            console.log(goalDetails[goal.goalId].length);
            goal['progress'] += (10/goalDetails[goal.goalId].length)
            axios.put("http://localhost:8080/goals/update/" + goal.goalId, goal)
        }
    };

    const handleDecrease = (detail, goal) => {
        if (detail.progress > 0) {
            {setProgress({ ...progress, [detail.goalDetailId]: detail.progress-10 });
            detail['progress'] -= 10
            axios.put("http://localhost:8080/goaldetails/update/" + detail.goalDetailId, detail)}
            goal['progress'] -= (10/goalDetails[goal.goalId].length)
            axios.put("http://localhost:8080/goals/update/" + goal.goalId, goal)
        }
    };

    const handleEditClick = (id, text) => {
        setEditableText({ ...editableText, [id]: text });
        setIsEditing({ ...isEditing, [id]: true });
    };

    const handleSaveClick = (detail) => {
        detail['text'] = editableText[detail.goalDetailId];
        axios.put("http://localhost:8080/goaldetails/update/" + detail.goalDetailId, detail)
        .then(() => { 
            setIsEditing({ ...isEditing, [detail.goalDetailId]: false });
        })   
    };


    const handleCancelClick = (id) => {
        setIsEditing({ ...isEditing, [id]: false });
    };

    const handleChange = (id, e) => {
        setEditableText({ ...editableText, [id]: e.target.value });
    };

    const handleShowDeleteModal = (goalId) => {
        setShowDeleteModal(true);
        setGoalToDelete(goalId);
    }
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setGoalToDelete(null);
    }

    const handleDeleteDetail = async (goalDetailId) => {
        try {
            await axios.delete("http://localhost:8080/goaldetails/delete/" + goalDetailId);
    
            setGoalDetails((prevGoalDetails) => {
                const updatedGoalDetails = { ...prevGoalDetails };
                    for (const goalId in updatedGoalDetails) {
                    updatedGoalDetails[goalId] = updatedGoalDetails[goalId].filter(detail => detail.goalDetailId !== goalDetailId);
                }
    
                return updatedGoalDetails;
            });
        } catch (error) {
            console.error("Failed to delete detail: ", error);
        }
    };
    

    const handleAddDetail = () => {

    }

    const handleDeleteGoal = async () => {
        try {
            await axios.delete("http://localhost:8080/goals/delete/" + goalToDelete);
            setGoals((prevGoals) => prevGoals.filter(goal => goal.goalId !== goalToDelete))
            handleCloseDeleteModal();
        } catch (error) {
            console.error("failed to delete goal: ", error)
        }
    }

    const updateGoals = (newGoal) => {
        setGoals(prevGoals => [...prevGoals, newGoal]);

        setGoalDetails(prevGoalDetails => ({
            ...prevGoalDetails,
            [newGoal.goalId]: newGoal.details
        }));
    };
    
    return(
        <div className='goalsPage'>
        <h1>Your Goals
             <Button variant='newGoal' onClick={() => setShowModal(true)}>New</Button>
        </h1>
        <CreateGoal show={showModal} handleClose={() => setShowModal(false)} updateGoals={updateGoals}/>
  
        {isLoggedIn &&
        <Accordion style={{width: '80%'}} alwaysOpen>
            {
                
                goals.map((goal) => (
                <>
                <div style={{ marginBottom: '20px' }} >
                <Accordion.Item eventKey={goal.goalId} className={goal.category}>
                <Accordion.Header>
                    <span>{goal.title}</span>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Container style={{ width: 200, marginRight: '10px' }}>
                            <ProgressBar now={goal.progress} variant='success' style={{ flex: '1'}} />
                        </Container>
                    </div>
                </Accordion.Header>
                    <Accordion.Body  className={goal.category} >
                    {goalDetails[goal.goalId] &&
                        <>
                        { goalDetails[goal.goalId].map((detail) => (
                            <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            {isEditing[detail.goalDetailId] ? (
                                <input type="text" value={editableText[detail.goalDetailId]} onChange={(e) => handleChange(detail.goalDetailId, e)} />
                            ) : (
                                <Form.Check type="checkbox" label={detail.text} />
                            )}
                           
                            <Container style={{ width: 200, marginRight: '10px' }}>
                                {progress[detail.goalDetailId] ? (
                                    <ProgressBar now={progress[detail.goalDetailId]} variant='success' style={{ flex: '1'}} />
                                ) : (
                                    <ProgressBar now={detail.progress} variant='success' style={{ flex: '1'}} />
                                )
                            }
                            
                            </Container>
                            <Button variant="edit" onClick={() => handleIncrease(detail, goal)}><FaPlus /></Button>
                            <Button variant="edit" onClick={() => handleDecrease(detail, goal)}><FaMinus /></Button>
                            {isEditing[detail.goalDetailId] ? (
                                <>
                                    <Button variant="edit" onClick={() => handleSaveClick(detail)}><FaCheck /></Button>
                                    <Button variant="edit" onClick={() => handleCancelClick(detail.goalDetailId)}><RxCross2 /></Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="edit" onClick={() => handleEditClick(detail.goalDetailId, detail.text)}><FaPen /></Button>
                                    <Button variant="edit" onClick={() => handleDeleteDetail(detail.goalDetailId)}><FaTrash /></Button>
                                </>
                            )}
                            </div>
                            </>
                        ))}
                        {goalDetails[goal.goalId].length === 0 &&
                        <h3>Add goal details!</h3>
                        }
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant = 'addDetail' onClick={() => handleAddDetail()}>Add Detail</Button>
                        <Button variant='deleteGoal' onClick={() => handleShowDeleteModal(goal.goalId)}>Delete</Button>
                        </div>
                        </>
                    }
                    </Accordion.Body>
                </Accordion.Item>
                </div>
               
                </>
                
                )
                )
                
            }
        </Accordion>
        }
        <DeleteModal show={showDeleteModal} handleClose={() => handleCloseDeleteModal} handleDeleteGoal={handleDeleteGoal}/>

        </div>
    )
}

export default Goals;