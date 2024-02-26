import {createContext, useContext} from 'react';
import {useState} from 'react';


export const UserContext = createContext();
export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    return <UserContext.Provider value = {{user, setUser }}>
        {children}
    </UserContext.Provider>
}


export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "blah"
        )
    }
    return context;
}


