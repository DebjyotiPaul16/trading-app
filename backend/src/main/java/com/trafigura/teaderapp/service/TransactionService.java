package com.trafigura.teaderapp.service;


import com.trafigura.teaderapp.model.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trafigura.teaderapp.repository.TransactionRepository;
import com.trafigura.teaderapp.model.Transaction;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public void processInsert(Transaction tx) {
        tx.setTradeId(UUID.randomUUID().toString());
        tx.setVersion(1);
        transactionRepository.save(tx);
    }

    public void processUpdate(Transaction tx) {
        if (tx.getTradeId() == null) {
            throw new IllegalArgumentException("TradeId is required for UPDATE");
        }

        List<Transaction> existing = transactionRepository.findByTradeIdOrderByVersionDesc(tx.getTradeId());
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("No existing trade found with ID " + tx.getTradeId());
        }

        int nextVersion = existing.get(0).getVersion() + 1;
        tx.setVersion(nextVersion);
        transactionRepository.save(tx);
    }

    public void processCancel(String tradeId, String createdBy) {
        List<Transaction> existing = transactionRepository.findByTradeIdOrderByVersionDesc(tradeId);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("No existing trade found with ID " + tradeId);
        }

        Transaction latest = existing.get(0);
        Transaction cancelTx = Transaction.builder()
                .tradeId(tradeId)
                .version(latest.getVersion() + 1)
                .securityCode(latest.getSecurityCode())
                .quantity(latest.getQuantity())
                .operation(latest.getOperation())
                .action("CANCEL")
                .createdBy(createdBy)
                .build();

        transactionRepository.save(cancelTx);
    }

    public List<Position> getPositions() {
        List<Transaction> allTx = transactionRepository.findAll();
        Map<String, Transaction> latestByTrade = allTx.stream()
                .collect(Collectors.toMap(
                        Transaction::getTradeId,                  // key: now String
                        t -> t,
                        (t1, t2) -> t1.getVersion() > t2.getVersion() ? t1 : t2
                ));
        Map<String, Integer> positionMap = new HashMap<>();

        for (Transaction tx : latestByTrade.values()) {
            String security = tx.getSecurityCode();

            if ("CANCEL".equalsIgnoreCase(tx.getAction())) {
                positionMap.put(security, positionMap.getOrDefault(security, 0));
            } else {
                int qty = "Buy".equalsIgnoreCase(tx.getOperation()) ? tx.getQuantity() : -tx.getQuantity();
                positionMap.merge(security, qty, Integer::sum);
            }
        }
        return positionMap.entrySet().stream()
                .map(e -> new Position(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
