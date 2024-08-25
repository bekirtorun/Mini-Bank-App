package com.oredata.minibankapp.repository;

import com.oredata.minibankapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String>, UserRepositoryCustom {

    Optional<User> findByUsername(String username);
}
