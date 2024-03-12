import './App.css';
import { Routes, Route,} from "react-router-dom";
import UserInfo from './pages/UserInfo';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './components/Login'
import { useSelector, useDispatch } from 'react-redux';
import Goals from './pages/Goals';
import CreateGoal from './components/CreateGoal';
import Explore from './pages/Explore';

function App() {
  
  return (
    <>

      <Header />
      <Routes>
        <Route path="/user" element={<UserInfo />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/goals" element={<Goals />}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/newgoal" element={<CreateGoal />}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
 
    </>
  );
}

export default App;
