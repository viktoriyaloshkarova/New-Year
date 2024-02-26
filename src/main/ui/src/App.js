import './App.css';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import { Routes, Route,} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import UserInfo from './pages/UserInfo';
import Header from './components/Header';
import Home from './pages/Home';
import { UserContext, UserContextProvider} from './context/UserContext';
import {QueryClientProvider,  QueryClient, useQuery} from  'react-query';
import Login from './components/Login'
import {CookiesProovider, CookiesProvider} from 'react-cookie'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { useSelector, useDispatch } from 'react-redux';

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
      </Routes>
 
    </>
  );
}

export default App;
