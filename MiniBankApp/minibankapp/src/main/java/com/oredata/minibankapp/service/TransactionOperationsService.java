package com.oredata.minibankapp.service;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.Transaction;
import com.oredata.minibankapp.model.User;
import com.oredata.minibankapp.model.dto.*;
import com.oredata.minibankapp.model.types.Status;
import com.oredata.minibankapp.repository.AccountRepository;
import com.oredata.minibankapp.repository.TransactionRepository;
import com.oredata.minibankapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionOperationsService {

    final UserRepository userRepository;

    final AccountRepository accountRepository;

    final TransactionRepository transactionRepository;

    public void transfer(TransferDTO transferDTO) {
        Transaction transaction = new Transaction();
        Optional<Account> senderAccount = accountRepository.findByName(transferDTO.getFromAccountName());
        Optional<Account> recipientAccount = accountRepository.findByName(transferDTO.getToAccountName());
        AccountUpdateDTO senderAccountUpdateDTO = AccountUpdateDTO.builder()
                .balance(senderAccount.get().getBalance().subtract(transferDTO.getTransferAmount()))
                .build();
        AccountUpdateDTO recipientAccountUpdateDTO = AccountUpdateDTO.builder()
                .balance(transferDTO.getTransferAmount().add(recipientAccount.get().getBalance()))
                .build();

        transaction.setFromId(senderAccount.get().getId());
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setAmount(transferDTO.getTransferAmount());
        transaction.setToId(recipientAccount.get().getId());

        if (senderAccount.get().getBalance().compareTo(transferDTO.getTransferAmount()) > 0) {
            transaction.setStatus(Status.SUCCESS);
            transactionRepository.save(transaction);
            accountRepository.updateAccount(senderAccountUpdateDTO, senderAccount, Optional.of(transaction));
            accountRepository.updateAccount(recipientAccountUpdateDTO, recipientAccount, Optional.of(transaction));
            Optional<User> user = userRepository.findById(transferDTO.getUserId());

            userRepository.updateUserAccountList(user, senderAccount, senderAccountUpdateDTO.getBalance());
            userRepository.updateUserAccountList(user, recipientAccount, recipientAccountUpdateDTO.getBalance());
        } else {
            transaction.setStatus(Status.FAILED);
            transactionRepository.save(transaction);
            accountRepository.updateAccount(null, senderAccount, Optional.of(transaction));
            accountRepository.updateAccount(null, recipientAccount, Optional.of(transaction));
        }


    }

    public void deposit(DepositDTO depositDTO) {
        Optional<User> user = userRepository.findById(depositDTO.getUserId());
        Optional<Account> account = accountRepository.findById(depositDTO.getAccountId());
        BigDecimal accountBalance = accountRepository.findById(depositDTO.getAccountId()).get().getBalance();
        depositDTO.setDepositAmount(depositDTO.getDepositAmount().subtract(accountBalance));
        accountRepository.depositToAccount(depositDTO);
        userRepository.updateUserAccountList(user, account, depositDTO.getDepositAmount());
    }

    public List<Transaction> getTransactionHistory(String id) {

        return accountRepository.findById(id).get().getTransactions();
    }

}
