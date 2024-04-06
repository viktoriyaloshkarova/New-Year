import ".//Home.css"
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {Button, Text} from "react-bootstrap";


function Home() {

    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    return (
    <>
      <div class="center">
        <h1 class="text-center" >New Year</h1>
        <h1 class="text-center">
          <span className="text-decoration-line-through">new</span>
          <span> improved you</span>
        </h1>
        
       
        <br/>
        <h2 class="text-center"> Inspiration for having new year goals</h2>
        <br/>
        <div class="text-center">
        {isLoggedIn &&
        <Button href="/goals" variant="getStarted">Get Started</Button>
        }
        {!isLoggedIn &&
            <Button href="login" variant="getStarted"> Get Started</Button> 
        }
        </div>
        </div>
    </>
    );
}

export default Home;