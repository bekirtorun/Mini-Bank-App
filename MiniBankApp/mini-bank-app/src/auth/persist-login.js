import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (auth && !auth.access_token) {
            navigate("/");
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading
                ? null
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;