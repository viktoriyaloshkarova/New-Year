import Login from '../components/Login';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/userSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserInfo() {
  
  const dispatch = useDispatch();
  function handleSignOut(event) {
    dispatch(userActions.removeUser());
  }
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  
console.log(isLoggedIn);
  return (
    <>
    <Container>
      <Row>
        <Col xs={4} id='menu'>
        {!isLoggedIn && <Login />}
     {isLoggedIn &&
      <button onClick={ (e) => handleSignOut(e)}>Log Out</button>
    } 
        </Col>
        <Col md='auto' id='display'>
        <p>Hello World!</p>
        </Col>
      </Row>
    

    
    </Container>
    </>
  );
}

export default UserInfo;