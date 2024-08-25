package com.oredata.minibankapp.model;

import com.oredata.minibankapp.model.types.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transaction")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Transaction {

    @Id
    String id;

    String fromId;

    String toId;

    BigDecimal amount;

    LocalDateTime transactionDate;

    Status status;

}
