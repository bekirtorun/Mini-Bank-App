package com.oredata.minibankapp.model;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "account")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Account {
    @Id
    String id;

    @Indexed(unique = true)
    String number;

    @Indexed(unique = true)
    String name;

    BigDecimal balance;

    List<Transaction> transactions;

    LocalDateTime createdAt;

    LocalDateTime updatedAt;


}
