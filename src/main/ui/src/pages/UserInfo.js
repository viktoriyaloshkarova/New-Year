import axios from 'axios';
import {useState, useEffect} from 'react';
import { useContext } from "react";
import { useUserContext } from "../context/UserContext";

import Login from '../components/Login';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/userSlice';

function UserInfo() {
  
  const dispatch = useDispatch();
  function handleSignOut(event) {
    dispatch(userActions.removeUser());
  }
  const userTest = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  
console.log(isLoggedIn);
  return (
    <>
    <p>Hello World!</p>

    {!isLoggedIn && <Login />}
     {isLoggedIn &&
      <button onClick={ (e) => handleSignOut(e)}>Log Out</button>
    } 
    </>
  );
}

export default UserInfo;