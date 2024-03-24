import { useState, useEffect } from "react";
import { Button, Card, Accordion, Form, ProgressBar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaPen } from 'react-icons/fa';
import axios from "axios";
import './/Goals.css'

function Goals() {
    const [goals, setGoals] = useState([]);
    let [setDetails, setSetDetails] = useState(false);
    const dispatch = useDispatch();
    const [goalDetails, setGoalDetails] = useState({});
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    useEffect(() => {
        const fetchGoals = async => {
            if (isLoggedIn) {
                axios.get("http://localhost:8080/goals/user/" + user.id)
                .then((response) => {
                    setGoals(response.data);
                    response.data.map((goal) => (
                        axios.get("http://localhost:8080/goaldetails/goal/" + goal.goalId).then((response) => {
                            let goalId = goal.goalId;
                            console.log('inside')
                            let resp = response.data
                            goal['details'] = resp
                            setGoalDetails(goalDetails=> ({
                                ...goalDetails, [goalId]: resp
                            }))
                            setSetDetails(true);
                    }))
                    )
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
   
    return(
        <>
        <h1>Your Goals
            <Button>New</Button>
        </h1>

  
        {isLoggedIn &&
        <Accordion style={{width: '80%'}} alwaysOpen>
            {
                
                goals.map((goal) => (
                <>
                <div style={{ marginBottom: '20px' }} >
                <Accordion.Item eventKey={goal.goalId} className={goal.category}>
                    <Accordion.Header>{goal.title}</Accordion.Header>
                    <Accordion.Body  className={goal.category} >
                    {setDetails &&
                        <>
                        { goal.details.map((detail) => (
                            <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Check type="checkbox" label={detail.text} />
                            <Container style={{ width: 200, marginRight: '10px' }}>
                            <ProgressBar now={progress} variant='success' style={{ flex: '1'}} />
                            </Container>
                            <Button variant="edit" onClick={handleButtonClick}><FaPen /></Button>
                            <Button variant="edit" onClick={() => setProgress(0)}><FaTrash /></Button>
                            </div>
                            </>
                        ))}
                        </>
                    }
                    {!setDetails &&
                    <h3>Add goal details!</h3>
                    }
                    </Accordion.Body>
                    
                </Accordion.Item>
                </div>
                {/* <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                    <Form>
                    <Form.Check type="checkbox" label={`${goal1}%`} />
                    </Form>
                    <p>Some text here</p>
                    <ProgressBar now={progress} label={`${progress}%`} />
                    <div>
                    <Button variant="primary" onClick={handleButtonClick}>
                        Increase Progress
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => setProgress(0)}>
                        Reset Progress
                    </Button>
                    </div>
                </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Check type="checkbox" label="Checkbox g;irea" />
                <Container style={{ width: 200, marginRight: '10px' }}>
                <ProgressBar now={progress} variant='success' style={{ flex: '1'}} />
                </Container>
                <Button variant="edit" onClick={handleButtonClick}><FaPen /></Button>
                <Button variant="edit" onClick={() => setProgress(0)}><FaTrash /></Button>
                </div>
                </Accordion.Body>
                </Accordion.Item> */}
               
                </>
                
                )
                )
                
            }
        </Accordion>
        }
      

        </>
    )
}

export default Goals;