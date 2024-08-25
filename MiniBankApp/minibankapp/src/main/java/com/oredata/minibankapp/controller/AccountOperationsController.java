package com.oredata.minibankapp.controller;

import com.oredata.minibankapp.model.Account;
import com.oredata.minibankapp.model.dto.*;
import com.oredata.minibankapp.service.AccountOperationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountOperationsController {

    private final AccountOperationsService accountOperationsService;

    @PostMapping("/create")
    public void create(@RequestBody AccountCreateDeleteDTO accountCreateDeleteDTO) {
        accountOperationsService.createAccount(accountCreateDeleteDTO);
    }

    @PostMapping("/search")
    public List<Account> search(@RequestBody AccountFilterDTO accountFilterDTO) {
        return accountOperationsService.searchAccount(accountFilterDTO);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable String id, @RequestBody AccountUpdateDTO accountUpdateDTO) {
         accountOperationsService.updateAccount(id,accountUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id, @RequestBody AccountCreateDeleteDTO accountCreateDeleteDTO) {
        accountOperationsService.deleteAccount(id,accountCreateDeleteDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> view(@PathVariable String id) {
        return ResponseEntity.ok(accountOperationsService.viewAccount(id));
    }
    @GetMapping("/get-user-details/{username}")
    public ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable String username) {
        return ResponseEntity.ok(accountOperationsService.getUserDetails(username));
    }

}
