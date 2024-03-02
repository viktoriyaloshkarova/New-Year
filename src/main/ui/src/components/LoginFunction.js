

import {jwtDecode} from 'jwt-decode';

import { UserContext} from '../context/UserContext';

import {useContext, useEffect, useState} from 'react';
import axios, { HttpStatusCode } from 'axios';
import { useUserContext } from "../context/UserContext";
import { useQuery, useQueryClient } from 'react-query';

const user = {};

const LoginFunction = {

  

  addUser: function(userObject){
    console.log("adding to database")
    let userEntry = {email: userObject.email, firstname: userObject.name, lastname: userObject.name, image: userObject.picture}
    let response = axios.post("http://localhost:8080/users/add", userEntry);
    if(response === HttpStatusCode.Created) {
      axios.get("http://localhost:8080/users/find/email/" + userObject.email).then((response) => {user = response.data});
      console.log("added");
    } else {
      console.log(response);
    }
  },
  
  handleCredentialResponse: function(response) {
    // TODO: figure out why this function is not running
    console.log("inhandlecredentials");
    console.log("encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    // usersetUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
    // add to database
    try {axios.get("http://localhost:8080/users/find/email/" + userObject.email).then((response) => {user = response.data})}
    catch(e) {this.addUser(userObject);}
    
  },
  initialize: async function() {
    /* global google */
    //eslint-disable-next-line
    google.accounts.id.initialize({
      client_id: "596584034308-c6k5qi2vcvo3504vatts66bimjvsovi5.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
      })
  // console.log(user);
  // const x = await axios.get("http://localhost:8080/users/find/email/" + user.email);
  // while (finished === false) {
  //   console.log("waiting")
  // }
  return user;
}

    // google.accounts.id.renderButton(
    //   document.getElementById("signInDiv"),
    //   { theme: "outline", size: "large" }  // customization attributes
    // );
    // google.accounts.id.prompt(); //display the One Tap dialog
    
  
  // return(user);
    
}

export default LoginFunction;