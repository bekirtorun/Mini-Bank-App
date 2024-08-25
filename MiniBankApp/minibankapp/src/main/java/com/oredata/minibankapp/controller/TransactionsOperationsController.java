package com.oredata.minibankapp.controller;

import com.oredata.minibankapp.model.Transaction;
import com.oredata.minibankapp.model.dto.*;
import com.oredata.minibankapp.service.TransactionOperationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionsOperationsController {

    final TransactionOperationsService transactionOperationsService;

    @PostMapping("/transfer")
    public void transfer(@RequestBody TransferDTO transferDTO) {
        transactionOperationsService.transfer(transferDTO);
    }

    @PutMapping("/deposit")
    public void deposit(@RequestBody DepositDTO depositDTO) {
        transactionOperationsService.deposit(depositDTO);
    }

    @GetMapping("/account/{id}")
    public List<Transaction> transactionHistory(@PathVariable String id) {
        return transactionOperationsService.getTransactionHistory(id);
    }
}
