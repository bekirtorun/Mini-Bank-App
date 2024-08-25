import React from "react";
import { useSelector } from "react-redux";
import TransactionTable from "../components/transaction-table-component";

const TransactionPage = () => {

    const transactions = useSelector(state => state.getTransactionHistory.response);
    console.log(transactions);

    return (
        <div className="transaction-page">
            {
                (transactions) ? (
                    <table>
                        <tr>
                            <th>Account From</th>
                            <th>Account To</th>
                            <th>Amount</th>
                            <th>Transaction Date</th>
                            <th>Status</th>
                        </tr>
                        {transactions &&
                            transactions.map((transaction) => {
                                return <TransactionTable transaction={transaction} />
                            })

                        }
                    </table>
                ) : (
                    <p>There is no transaction for this account</p>
                )
            }
        </div>
    )
}
export default TransactionPage;