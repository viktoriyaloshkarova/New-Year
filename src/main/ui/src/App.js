import './App.css';
import {useEffect, useState} from 'react';
import { Routes, Route} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import UserInfo from './pages/UserInfo';
import Header from './components/Header';
import Home from './pages/Home';
import { UserContext} from './context/UserContext';



function App() {

  const [user, setUser] = useState({});

  function handleCredentialResponse(response) {
    console.log("encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "596584034308-c6k5qi2vcvo3504vatts66bimjvsovi5.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); //display the One Tap dialog
  }, []);

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  
  return (
    <>
    <div id="signInDiv"></div>
    {Object.keys(user).length !== 0 &&
      <button onClick={ (e) => handleSignOut(e)}>Log Out</button>
    }
      <UserContext.Provider value={[user, setUser]}>
      <Header />
      <Routes>
        <Route path="/user" element={<UserInfo />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
