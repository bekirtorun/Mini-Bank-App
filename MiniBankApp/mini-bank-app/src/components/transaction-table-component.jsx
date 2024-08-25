import React from "react";

const TransactionTable = ({ transaction }) => {


    return (
        <tr>
            <td>{transaction.fromId}</td>
            <td>{transaction.toId}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.transactionDate}</td>
            <td>{transaction.status}</td>
        </tr>
    )
}
export default TransactionTable;