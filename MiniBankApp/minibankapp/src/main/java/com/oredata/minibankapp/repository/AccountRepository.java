package com.oredata.minibankapp.repository;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account, String> , AccountRepositoryCustom {
    Optional<Account> findByNameAndNumber(String name, String number);

    void deleteById(String id);

    Optional<Account> findByName(String name);
}
