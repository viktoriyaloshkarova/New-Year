import axios from 'axios';
import {useState, useEffect} from 'react';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserInfo() {
  //   const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios.get("http://localhost:8080/users/find/1").then((response) => {
  //     setUser(response.data);
  //   });
  // }, []);
  // if (!user) return null;

  const [user, setUser] = useContext(UserContext);

  function handleSignOut(event) {
    setUser({});
  }

  return (
    <>
    <p>Hello World!</p>
    {user &&
      <div>
        <img src={user.picture} alt="person icon"></img>
        <h3>Hello {user.name}</h3>
      </div>
    }
     {Object.keys(user).length !== 0 &&
      <button onClick={ (e) => handleSignOut(e)}>Log Out</button>
    }
    </>
  );
}

export default UserInfo;