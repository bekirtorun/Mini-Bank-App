package com.oredata.minibankapp.repository;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.Transaction;
import com.oredata.minibankapp.model.dto.AccountUpdateDTO;
import com.oredata.minibankapp.model.dto.DepositDTO;

import java.util.Optional;

public interface AccountRepositoryCustom {
    void updateAccount(AccountUpdateDTO accountUpdateDTO, Optional<Account> account, Optional<Transaction> transaction);

    void depositToAccount(DepositDTO depositDTO);
}
