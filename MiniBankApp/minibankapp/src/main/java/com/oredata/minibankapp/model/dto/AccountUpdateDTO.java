package com.oredata.minibankapp.model.dto;

import com.oredata.minibankapp.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountUpdateDTO {

    BigDecimal balance;
}
