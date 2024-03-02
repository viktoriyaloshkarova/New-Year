import {Navbar, Nav, Container, NavDropdown, Button, Form, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/userSlice';
import Login from '../components/Login';
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


    return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href='home'>New Year App</Navbar.Brand>
            <Navbar.Toggle  aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Your Goals" id="basic-nav-dropdown">
                        <NavDropdown.Item href="goals">View All</NavDropdown.Item>
                        <NavDropdown.Item href="newgoal">Create New Goal</NavDropdown.Item>
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
    </Navbar>
    )
}

export default Header;
