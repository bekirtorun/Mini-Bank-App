package com.oredata.minibankapp.model.dto;

import com.oredata.minibankapp.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionHistoryDTO {

    Transaction transaction;
}
