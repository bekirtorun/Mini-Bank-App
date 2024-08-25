import { createContext, useState } from "react";

const initialState = {
    "username": localStorage.getItem("username"),
    "access_token": localStorage.getItem("access_token"),
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialState);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;