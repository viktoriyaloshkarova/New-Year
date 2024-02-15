

function Login() {
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
  
    return(
        <>
        <UserContext.Provider value={[user, setUser]}></UserContext.Provider>
        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Log Out</button>
        }
        </>
    )
    
}

export default Login;