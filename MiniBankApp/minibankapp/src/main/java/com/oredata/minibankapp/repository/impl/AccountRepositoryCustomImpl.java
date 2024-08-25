package com.oredata.minibankapp.repository.impl;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.Transaction;
import com.oredata.minibankapp.model.dto.AccountUpdateDTO;
import com.oredata.minibankapp.model.dto.DepositDTO;
import com.oredata.minibankapp.repository.AccountRepositoryCustom;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountRepositoryCustomImpl implements AccountRepositoryCustom {

    final MongoTemplate mongoTemplate;

    @Override
    public void updateAccount(AccountUpdateDTO accountUpdateDTO, Optional<Account> account, Optional<Transaction> transaction) {

        Query query = new Query(Criteria.where("_id").is(account.get().getId()));
        Update update = new Update();
        List<Transaction> transactionList = new ArrayList<>();
        if (account.get().getTransactions() != null) {
            transactionList = account.get().getTransactions();
        }
        if (transaction.isPresent()) {
            transactionList.add(transaction.get());
            update.set("transactions", transactionList);
        }
        if (accountUpdateDTO != null) {
            update.set("balance", accountUpdateDTO.getBalance());
        }

        update.setOnInsert("_id", account.get().getId());
        mongoTemplate.upsert(query, update, Account.class);

    }

    @Override
    public void depositToAccount(DepositDTO depositDTO) {
        Query query = new Query(Criteria.where("_id").is(depositDTO.getAccountId()));
        Update update = new Update();
        update.set("balance", (depositDTO.getDepositAmount()));

        update.setOnInsert("_id", depositDTO.getAccountId());
        mongoTemplate.upsert(query, update, Account.class);
    }
}
