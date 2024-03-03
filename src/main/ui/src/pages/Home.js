import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {Button, Text} from "react-bootstrap";


function Home() {

    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    return (
    <>
    <Container >
      <Row className="justify-content-md-center">
      <Col md="auto" >
      <br/><br/><br/><br/><br/>
        <h1 class="text-center" >New Year</h1>

<div style={{whiteSpace: 'nowrap'}}>
        <h1 className="text-decoration-line-through">new </h1>
        <h1 class="text-center"> new improved you</h1> 
        </div>
       
        <br/>
        <h2 class="text-center"> Inspiration for having new year goals</h2>
        <br/>
        <div class="text-center">
        {isLoggedIn &&
        <Button href="/goals">Get Started</Button>
        }
        {!isLoggedIn &&
            <Button href="login"> Get Started</Button> 
        }
        </div>
      </Col >
     
      </Row>
    </Container>
    </>
    );
}

export default Home;