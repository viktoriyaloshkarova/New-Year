import './/Header.css'

import {Navbar, Nav, Container, NavDropdown, Button, Form, Modal, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/userSlice';
import Login from '../Login';
import { useState } from 'react';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    function handleSignOut(e) {
        dispatch(userActions.removeUser());
    }
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    const navbarStyle = {
        background: 'linear-gradient(to right, #0799b0, #7ed957)', 
        color: 'white',
    };

    return (

        <Navbar expand="lg" className="bg-body-tertiary" >
      <Navbar.Brand href="home">New Year App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav className="mr-auto">
          
          <NavDropdown title="Your Goals" id="basic-nav-dropdown" className="custom-dropdown-left">
            <NavDropdown.Item href="goals">View All</NavDropdown.Item>
            <NavDropdown.Item href="newgoal">Create New Goal</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="explore">Explore</Nav.Link>
        </Nav>
        <Nav>
          
          <NavDropdown title="Account" id="basic-nav-dropdown-right" drop="down" className="custom-dropdown-right">
       
          <NavDropdown.Item href="user">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                {!isLoggedIn &&
                    <NavDropdown.Item >
                        <Form>
                        <Button variant="custom2" onClick={handleShow}>
                            Log in
                        </Button>
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <Login/>
                            </Modal.Body>
                        </Modal>
                        </Form>
                        </NavDropdown.Item>
                }
                {isLoggedIn &&
                <>
                <NavDropdown.Item> 
                    <Form inline>
                        <Button variant="custom2" onClick={ (e) => handleSignOut(e)}>Log out </Button> 
                    </Form>
                </NavDropdown.Item>
                </>
                }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        )
    }

{/* <Navbar className="bg-body-tertiary justify-content-between" style={navbarStyle}>
        <Container id='topnav'>
            <Navbar.Brand href='home' >New Year App</Navbar.Brand>
            <Navbar.Toggle  aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" style={navbarStyle}>
                <Nav className="me-auto" style={navbarStyle}>
                    <NavDropdown title="Your Goals" id="basic-nav-dropdown" style={navbarStyle}>
                        <NavDropdown.Item href="goals" style={{ background: 'green', color: 'white', padding: '0.5rem 1rem'}}>View All</NavDropdown.Item>
                        <NavDropdown.Item href="newgoal" style={navbarStyle}>Create New Goal</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href='explore'>Explore</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
            <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="user">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                {!isLoggedIn &&
                    <NavDropdown.Item >
                        <Form>
                        <Button variant="outline-dark" onClick={handleShow}>
                            Log in
                        </Button>
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <Login/>
                            </Modal.Body>
                        </Modal>
                        </Form>
                        </NavDropdown.Item>
                }
                {isLoggedIn &&
                <>
                <NavDropdown.Item> 
                    <Form inline>
                        <Button variant="outline-dark" onClick={ (e) => handleSignOut(e)}>Log out </Button> 
                    </Form>
                </NavDropdown.Item>
                </>
                }
            </NavDropdown>
            </Navbar.Collapse>
        </Container>
    </Navbar> */}




export default Header;
