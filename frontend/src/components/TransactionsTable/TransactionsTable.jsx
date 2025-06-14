import React from 'react';
import { useQuery } from 'react-query';
import { getTransactions } from '../../services/api';

function TransactionsTable({ onSelectTrade }) {
  const { data, isLoading } = useQuery('transactions', getTransactions);

  if (isLoading) return <p>Loading transactions...</p>;

  return (
      <div>
        <h2>Transactions</h2>
        <table>
          <thead>
          <tr>
            <th>Trade ID</th>
            <th>Security</th>
            <th>Qty</th>
            <th>Operation</th>
            <th>Timestamp</th>
          </tr>
          </thead>
          <tbody>
          {data?.map((tx) => {
            const isCancelled = tx.action === 'CANCEL';
            return (
                <tr
                    key={tx.transactionId}
                    className={isCancelled ? 'cancelled-row' : ''}
                    onClick={() => !isCancelled && onSelectTrade(tx)}
                >
                  <td>{tx.tradeId}</td>
                  <td>{tx.securityCode}</td>
                  <td>{tx.quantity}</td>
                  <td>{tx.operation}</td>
                  <td>{new Date(tx.createdTimestamp).toLocaleString('en-GB', {
                    timeZone: 'GMT',
                    timeZoneName: 'short'
                  })}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}

export default TransactionsTable;
