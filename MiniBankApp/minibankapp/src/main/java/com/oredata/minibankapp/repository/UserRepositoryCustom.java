package com.oredata.minibankapp.repository;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.User;

import java.math.BigDecimal;
import java.util.Optional;

public interface UserRepositoryCustom {
    void addUserAccountList(Optional<User> user, Optional<Account> account);

    void deleteUserAccountList(Optional<User> user, Optional<Account> account);

    void updateUserAccountList(Optional<User> user, Optional<Account> account, BigDecimal Balance);


}
