import './App.css';
import {useContext, useEffect, useState} from 'react';
import { Routes, Route,} from "react-router-dom";
import UserInfo from './pages/UserInfo';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './components/Login'
import { useSelector, useDispatch } from 'react-redux';
import Goals from './pages/Goals';
import CreateGoal from './components/CreateGoal';
import Explore from './pages/Explore';

function App() {
  

  const userTest = useSelector((state) => state.user.user);
 

  return (
    <>

      <Header />
      {!userTest && <Login />}
      {userTest && 
      <div>
      <p>{userTest.email}</p>
      <img src={userTest.picture} alt=""></img>
      </div>
      }
      
      <Routes>
        <Route path="/user" element={<UserInfo />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/goals" element={<Goals />}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/newgoal" element={<CreateGoal />}/>
      </Routes>
 
    </>
  );
}

export default App;
