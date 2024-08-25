import React from "react";
import { useNavigate } from "react-router";

const DashboardPage = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-page">
            <div className="welcome-user">
                <p>Welcome {localStorage.getItem('username').toLocaleUpperCase()}</p>
                <button type="button" onClick={()=>{navigate("/accounts")}}>Accounts</button>
            </div>
        </div>
    )
}
export default DashboardPage;