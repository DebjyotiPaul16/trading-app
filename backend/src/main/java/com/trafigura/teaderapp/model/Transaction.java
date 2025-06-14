package com.trafigura.teaderapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private Long tradeId;
    private Integer version;
    private String securityCode;
    private Integer quantity;

    private String action;
    private String operation;

    private String createdBy;

    @CreationTimestamp
    private LocalDateTime createdTimestamp;
}
