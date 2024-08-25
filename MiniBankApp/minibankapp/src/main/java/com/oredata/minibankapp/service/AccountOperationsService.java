package com.oredata.minibankapp.service;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.User;
import com.oredata.minibankapp.model.dto.*;
import com.oredata.minibankapp.model.exception.NonUniqueException;
import com.oredata.minibankapp.repository.AccountRepository;
import com.oredata.minibankapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountOperationsService {

    private final AccountRepository accountRepository;

    private final UserRepository userRepository;

    public void createAccount(AccountCreateDeleteDTO accountCreateDeleteDTO) {
        if (accountRepository.findByName(accountCreateDeleteDTO.getAccountName()).isEmpty()) {
            Optional<User> user = userRepository.findByUsername(accountCreateDeleteDTO.getUsername());
            int number = 0;
            int size = 0;
            if (user.get().getAccounts() != null) {
                size = user.get().getAccounts().size();
                number = Integer.parseInt(user.get().getAccounts().get(size-1).getNumber());
            }
            Account newAccount = Account.builder()
                    .number(String.valueOf(number + 1))
                    .name(accountCreateDeleteDTO.getAccountName())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .balance(BigDecimal.valueOf(0))
                    .build();
            accountRepository.save(newAccount);
            Optional<Account> insertedAccount = accountRepository.findByNameAndNumber(newAccount.getName(), newAccount.getNumber());
            userRepository.addUserAccountList(user, insertedAccount);
        }
        else {
            throw new NonUniqueException(accountCreateDeleteDTO.getAccountName());
        }

    }

    public List<Account> searchAccount(AccountFilterDTO accountFilterDTO) {
        Optional<User> user = userRepository.findById(accountFilterDTO.getId());
        return user.get().getAccounts();
    }

    public void updateAccount(String id, AccountUpdateDTO accountUpdateDTO) {

        Optional<Account> account = accountRepository.findById(id);

        accountRepository.updateAccount(accountUpdateDTO, account,null);

    }

    public void deleteAccount(String id, AccountCreateDeleteDTO accountCreateDeleteDTO) {
        Optional<User> user = userRepository.findByUsername(accountCreateDeleteDTO.getUsername());
        Optional<Account> deletedAccount = accountRepository.findByName(accountCreateDeleteDTO.getAccountName());
        userRepository.deleteUserAccountList(user,deletedAccount);
        accountRepository.deleteById(id);

    }

    public AccountDTO viewAccount(String id) {
        Optional<Account> searchedAccount = accountRepository.findById(id);
        return AccountDTO.builder()
                .balance(searchedAccount.get().getBalance())
                .name(searchedAccount.get().getName())
                .number(searchedAccount.get().getNumber())
                .build();
    }

    public UserDetailsDTO getUserDetails(String username){
        Optional<User> user = userRepository.findByUsername(username);
        return UserDetailsDTO.builder()
                .id(user.get().getId())
                .email(user.get().getEmail())
                .username(user.get().getUsername())
                .build();
    }

}
