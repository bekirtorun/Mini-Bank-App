package com.oredata.minibankapp.repository;

import com.oredata.minibankapp.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction,String> {

}
