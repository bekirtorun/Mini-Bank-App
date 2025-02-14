package com.oredata.minibankapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransferDTO {

    String userId;

    BigDecimal transferAmount;

    String fromAccountName;

    String toAccountName;

    LocalDateTime transactionDate;
}
