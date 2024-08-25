import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { createAccount } from "../store/fetchApi/accountOperations/create-account-reducer";
import { useNavigate } from "react-router";

const CreateAccountPage = () => {
    const username = localStorage.getItem('username'); //username state
    const [accountName, setAccountName] = useState(""); //account name state
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const handleCreate = () => {
        const accountCreateDTO = {
            "username": username,
            "accountName": accountName
        }

        const createCall = {
            url: `${process.env.REACT_APP_BACKEND_URL}/accounts/create`,
            accountCreateDTO: accountCreateDTO,
            axios: axiosPrivate
        }

        dispatch(createAccount(createCall));
    }

    return (
        <div className="create-account-page">
            <h2>Create Account</h2>

            <form>

                <label for="username">Username</label><br />
                <input type="text" id="username" name="username" value={username} /><br />


                <label for="accountName">Account Name</label><br />
                <input type="text" id="accountName" name="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)} /><br /><br />

                <button type="button" onClick={handleCreate}>Create</button>
            </form>
        </div>
    )
}
export default CreateAccountPage;