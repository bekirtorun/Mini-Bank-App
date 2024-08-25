import React, { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { searchAccount } from "../store/fetchApi/accountOperations/search-account-reducer";
import AccountTable from "../components/account-table-component";
import { useNavigate } from "react-router";

const AccountPage = () => {

    const accounts = useSelector(state => state.searchAccount.response);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const accountSearchDTO = {
            "id": localStorage.getItem('userId')
        }
        const viewCall = {
            axios: axiosPrivate,
            url: `${process.env.REACT_APP_BACKEND_URL}/accounts/search`,
            accountSearchDTO: accountSearchDTO
        }
        dispatch(searchAccount(viewCall));
    }, [])

    return (
        <div className="account-page">
            <table>
                <tr>
                    <th>Account Name</th>
                    <th>Account Number</th>
                    <th>Balance</th>
                </tr>
                {accounts &&
                    accounts.map((account) => {
                        return <AccountTable account={account} />
                    })

                }
            </table>
            <button className="create-account" type="button" onClick={() => { navigate("/create-account") }}> Create Account</button>
            <button className="transfer-money" type="button" onClick={() => { navigate("/transfer-money") }}> Transfer Money</button>
        </div>
    )
}
export default AccountPage;