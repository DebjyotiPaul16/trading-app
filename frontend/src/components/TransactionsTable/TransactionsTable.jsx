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
            <th>Action</th>
            <th>Operation</th>
            <th>Created By</th>
            <th>Version</th>
            <th>Timestamp (GMT)</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((tx) => (
            <tr key={tx.transactionId} onClick={() => onSelectTrade(tx)}>
              <td>{tx.tradeId}</td>
              <td>{tx.securityCode}</td>
              <td>{tx.quantity}</td>
              <td>{tx.action}</td>
              <td>{tx.operation}</td>
              <td>{tx.createdBy}</td>
              <td>{tx.version}</td>
              <td>{new Date(tx.createdTimestamp).toLocaleString('en-GB', { timeZone: 'GMT', timeZoneName: 'short' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;