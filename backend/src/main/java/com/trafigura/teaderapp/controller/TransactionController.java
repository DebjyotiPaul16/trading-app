package com.trafigura.teaderapp.controller;

import com.trafigura.teaderapp.model.Position;
import com.trafigura.teaderapp.model.Transaction;
import com.trafigura.teaderapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trader-app")
public class TransactionController {


    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transactions")
    public ResponseEntity<String> insertTransaction(@RequestBody Transaction tx) {
        tx.setAction("INSERT");
        transactionService.processInsert(tx);
        return ResponseEntity.ok("Transaction inserted");
    }

    @PutMapping("/transactions")
    public ResponseEntity<String> updateTransaction(@RequestBody Transaction tx) {
        if (!"UPDATE".equalsIgnoreCase(tx.getAction())) {
            return ResponseEntity.badRequest().body("Action must be UPDATE");
        }
        transactionService.processUpdate(tx);
        return ResponseEntity.ok("Transaction updated");
    }

    @DeleteMapping("/transactions/{tradeId}")
    public ResponseEntity<String> cancelTransaction(@PathVariable Long tradeId, @RequestParam String createdBy) {
        transactionService.processCancel(tradeId, createdBy);
        return ResponseEntity.ok("Transaction cancelled");
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/positions")
    public List<Position> getPositions() {
        return transactionService.getPositions();
    }
}