import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { getTransactionHistory } from "../store/fetchApi/transactionOperations/get-transaction-history-reducer";
import TransactionPage from "../pages/transaction-page";
import { useNavigate } from "react-router";
import { deleteAccount } from "../store/fetchApi/accountOperations/delete-account-reducer";

const AccountTable = ({ account }) => {
    const id = account.id;
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BACKEND_URL;

    const transactionsHandle = () => {
        const transactionCall = {
            url: baseURL + "/transactions/account/" + id,
            axios: axiosPrivate
        }
        dispatch(getTransactionHistory(transactionCall));
        navigate('/transactions');
    }
    const depositHandle = () => {
        localStorage.setItem('depositAccountId',account.id);
        navigate('/deposit');
    }
    const deleteHandle = () => {
        const deleteCall = {
            url: baseURL + "/accounts/" + id,
            axios: axiosPrivate,
            accountName: account.name
        }
        dispatch(deleteAccount(deleteCall));
    }

    return (
        <tr>
            <td>{account.name}</td>
            <td>{account.number}</td>
            <td>{account.balance}</td>
            <button type="button" onClick={transactionsHandle}>Transactions</button>
            <button type="button" onClick={depositHandle}>Deposit</button>
            <button type="button" onClick={deleteHandle}>Delete Account</button>
        </tr>
    )
}
export default AccountTable;