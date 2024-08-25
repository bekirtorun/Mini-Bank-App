package com.oredata.minibankapp.repository.impl;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.User;
import com.oredata.minibankapp.model.dto.AccountDTO;
import com.oredata.minibankapp.repository.UserRepositoryCustom;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    final MongoTemplate mongoTemplate;

    @Override
    public void addUserAccountList(Optional<User> user, Optional<Account> account) {
        List<Account> accountList = new ArrayList<>();
        if(user.get().getAccounts() != null){
            accountList = user.get().getAccounts();
        }
        accountList.add(account.get());
        Query query = new Query(Criteria.where("_id").is(user.get().getId()));
        Update update = new Update();

        update.set("accounts",accountList);
        update.setOnInsert("_id",user.get().getId());
        mongoTemplate.upsert(query,update, User.class);
    }

    @Override
    public void deleteUserAccountList(Optional<User> user, Optional<Account> account) {
        if (user.get().getAccounts() != null){
            int index = 0;
            List<Account> accountList = user.get().getAccounts();
            for (int i = 0; i<accountList.size();i++){
                if (accountList.get(i).getId().equals(account.get().getId())){
                    index = i;
                }
            }
            accountList.remove(index);
            Query query = new Query(Criteria.where("_id").is(user.get().getId()));
            Update update = new Update();

            update.set("accounts",accountList);
            update.setOnInsert("_id",user.get().getId());
            mongoTemplate.upsert(query,update, User.class);
        }
    }

    @Override
    public void updateUserAccountList(Optional<User> user, Optional<Account> account, BigDecimal balance) {
        if (user.get().getAccounts() != null){
            int index = 0;
            List<Account> accountList = user.get().getAccounts();
            for (int i = 0; i<accountList.size();i++){
                if (accountList.get(i).getId().equals(account.get().getId())){
                    index = i;
                    accountList.get(i).setBalance(balance);
                }
            }
            Query query = new Query(Criteria.where("_id").is(user.get().getId()));
            Update update = new Update();

            update.set("accounts",accountList);
            update.setOnInsert("_id",user.get().getId());
            mongoTemplate.upsert(query,update, User.class);
        }
    }
}
