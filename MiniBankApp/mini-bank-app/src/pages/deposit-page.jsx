import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { deposit } from "../store/fetchApi/transactionOperations/deposit-reducer";

const DepositPage = () => {
    const [depositAmount, setDepositAmount] = useState(""); //deposit state

    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const handleTransfer = () => {

        const depositCall = {
            url: `${process.env.REACT_APP_BACKEND_URL}/transactions/deposit`,
            depositAmount: depositAmount,
            axios: axiosPrivate
        }

        dispatch(deposit(depositCall));
    }

    return (
        <div className="transfer-money-page">
            <h2>Deposit-Money</h2>

            <form>
                <label for="deposit">Deposit Money</label><br />
                <input type="text" id="deposit" name="deposit" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} /><br />



                <button type="button" onClick={handleTransfer}>Deposit</button>
            </form>
        </div>
    )
}
export default DepositPage;