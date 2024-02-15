import {Navbar, Nav, Container} from 'react-bootstrap';

const Header = () => {
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href='home'>New Year App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href='home'>Home</Nav.Link>
                    <Nav.Link href='user'>Account</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default Header;
