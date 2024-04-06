import { useState, useEffect } from "react";
import { Button, Card, Accordion, Form, ProgressBar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaPen, FaCheck } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import './/Goals.css'

function Goals() {
    const [goals, setGoals] = useState([]);
    const [editableText, setEditableText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const dispatch = useDispatch();
    // delete unused variable
    const [goalDetails, setGoalDetails] = useState({});
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
                                goal['details'] = resp
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

    console.log(goalDetails)
    console.log(goals)
    const [progress, setProgress] = useState(0);
    const [goal1, setGoal] = useState(0);
    const handleButtonClick = () => {
      // Update progress on button click
      setProgress(progress + 10);
    };

    const handleEditClick = (id, text) => {
        setEditableText({ ...editableText, [id]: text });
        setIsEditing({ ...isEditing, [id]: true });
    };

    const handleSaveClick = (detail) => {
        detail['text'] = editableText[detail.goalDetailId];
        axios.put("http://localhost:8080/goaldetails/update/" + detail.goalDetailId, detail)
        .then((response) => { 
            setIsEditing({ ...isEditing, [detail.goalDetailId]: false });
        })   
    };

    const handleCancelClick = (id) => {
        setIsEditing({ ...isEditing, [id]: false });
    };

    const handleChange = (id, e) => {
        setEditableText({ ...editableText, [id]: e.target.value });
    };
   
    return(
        <div className='goalsPage'>
        <h1>Your Goals
             <Button variant='newGoal'>New</Button>
        </h1>

  
        {isLoggedIn &&
        <Accordion style={{width: '80%'}} alwaysOpen>
            {
                
                goals.map((goal) => (
                <>
                <div style={{ marginBottom: '20px' }} >
                <Accordion.Item eventKey={goal.goalId} className={goal.category}>
                <Accordion.Header>
                    <span>{goal.title}</span>
                    
                        <Container style={{ width: 200, marginRight: '0px' }}>
                            <ProgressBar now={progress} variant='success' style={{ flex: '1'}} />
                        </Container>
                    
                </Accordion.Header>
                    <Accordion.Body  className={goal.category} >
                    {goal.details &&
                        <>
                        { goal.details.map((detail) => (
                            <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            {isEditing[detail.goalDetailId] ? (
                                <input type="text" value={editableText[detail.goalDetailId]} onChange={(e) => handleChange(detail.goalDetailId, e)} />
                            ) : (
                                <Form.Check type="checkbox" label={detail.text} />
                            )}
                            <Container style={{ width: 200, marginRight: '10px' }}>
                            <ProgressBar now={progress} variant='success' style={{ flex: '1'}} />
                            </Container>
                            {isEditing[detail.goalDetailId] ? (
                                <>
                                    <Button variant="edit" onClick={() => handleSaveClick(detail)}><FaCheck /></Button>
                                    <Button variant="edit" onClick={() => handleCancelClick(detail.goalDetailId)}><RxCross2 /></Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="edit" onClick={() => handleEditClick(detail.goalDetailId, detail.text)}><FaPen /></Button>
                                    <Button variant="edit" onClick={() => setProgress(0)}><FaTrash /></Button>
                                </>
                            )}
                            </div>
                            </>
                        ))}
                        {goal.details.length === 0 &&
                        <h3>Add goal details!</h3>
                        }
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant = 'addDetail'>Add Detail</Button>
                        <Button variant='deleteGoal'>Delete</Button>
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
      

        </div>
    )
}

export default Goals;