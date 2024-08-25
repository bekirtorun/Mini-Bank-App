import React from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate("login");
    }

    return (
        <div className="homepage">

            Welcome to Mini Bank App
            <button onClick={handleLoginButton} >Login</button>
        </div>
    )
}
export default HomePage;