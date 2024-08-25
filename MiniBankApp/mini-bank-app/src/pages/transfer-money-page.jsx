import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { transferMoney } from "../store/fetchApi/transactionOperations/transfer-money-reducer";

const TransferMoneyPage = () => {
    const [from, setFrom] = useState(""); //sender account state
    const [to, setTo] = useState("");  //recipient account state
    const [transferAmount, setTransferAmount] = useState(); //transfer amount
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const handleTransfer = () => {
        const transferMoneyDTO = {
            transferAmount: transferAmount,
            fromAccountName: from,
            toAccountName: to
        }

        const transferCall = {
            url: `${process.env.REACT_APP_BACKEND_URL}/transactions/transfer`,
            transferMoneyDTO: transferMoneyDTO,
            axios: axiosPrivate
        }

        dispatch(transferMoney(transferCall));
    }

    return (
        <div className="transfer-money-page">
            <h2>Transfer-Money</h2>

            <form>
                <label for="from">From Account Name</label><br />
                <input type="text" id="from" name="from" value={from} onChange={(e) => setFrom(e.target.value)} /><br />

                <label for="to">To Account Name</label><br />
                <input type="text" id="to" name="to" value={to} onChange={(e) => setTo(e.target.value)} /><br />

                <label for="amount">Transfer Amount</label><br />
                <input type="text" id="amount" name="amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} /><br /><br />

                <button type="button" onClick={handleTransfer}>Transfer</button>
            </form>
        </div>
    )
}
export default TransferMoneyPage;