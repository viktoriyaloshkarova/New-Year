

import {jwtDecode} from 'jwt-decode';

import { UserContext} from '../context/UserContext';

import {useContext, useEffect, useState} from 'react';
import axios, { HttpStatusCode } from 'axios';
import { useUserContext } from "../context/UserContext";
import { useQuery, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/authSlice';
import { userActions } from '../redux/userSlice';


function Login() {

  const user = useUserContext();
  const dispatch = useDispatch();
  const userTest = useSelector((state) => state.user.user);

  function addUser(userObject){
    console.log("adding to database " +  userObject.email)
    let userEntry = {email: userObject.email, firstname: userObject.given_name, lastname: userObject.family_name, image: userObject.picture}
    let response = axios.post("http://localhost:8080/users/add", userEntry);
    if(response === HttpStatusCode.Created) {
      axios.get("http://localhost:8080/users/find/email/" + userObject.email).then((response) => dispatch(userActions.setUser(response.data)));
      console.log("added");
    } else {
      console.log('error' + response);
    }
  }
  
  function handleCredentialResponse(response) {
    // TODO: figure out why this function is not running
    console.log("inhandlecredentials");
    console.log("encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    // usersetUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    dispatch(authActions.login());
    // add to database
    try {axios.get("http://localhost:8080/users/find/email/" + userObject.email).then((response) => dispatch(userActions.setUser(response.data)))}
    catch(e) {addUser(userObject);}
    
  }
  useEffect(() => {
    /* global google */
    // eslint-disable-next-line
    google.accounts.id.initialize({
      client_id: "596584034308-c6k5qi2vcvo3504vatts66bimjvsovi5.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); //display the One Tap dialog
    
  });




  
  
    return(
        <>
        <div id="signInDiv"></div>
        </>
    )
    
}

export default Login;