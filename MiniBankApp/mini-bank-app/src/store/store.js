import { configureStore } from "@reduxjs/toolkit";

import createAccountReducer from "./fetchApi/accountOperations/create-account-reducer";
import deleteAccountReducer from "./fetchApi/accountOperations/delete-account-reducer";
import searchAccountReducer from "./fetchApi/accountOperations/search-account-reducer";
import updateAccountReducer from "./fetchApi/accountOperations/update-account-reducer";
import viewAccountReducer from "./fetchApi/accountOperations/view-account-reducer";
import transferMoneyReducer from "./fetchApi/transactionOperations/transfer-money-reducer";
import getTransactionHistoryReducer from "./fetchApi/transactionOperations/get-transaction-history-reducer";

export default configureStore({
    reducer: {
        createAccount: createAccountReducer,
        deleteAccount: deleteAccountReducer,
        searchAccount: searchAccountReducer,
        updateAccount: updateAccountReducer,
        viewAccount: viewAccountReducer,
        transferMoney: transferMoneyReducer,
        getTransactionHistory: getTransactionHistoryReducer
    }
})