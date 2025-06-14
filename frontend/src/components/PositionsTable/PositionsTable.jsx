import React from 'react';
import { useQuery } from 'react-query';
import { getPositions } from '../../services/api';

function PositionsTable() {
  const { data, isLoading } = useQuery('positions', getPositions);

  if (isLoading) return <p>Loading positions...</p>;

  return (
    <div>
      <h2>Positions</h2>
      <table>
        <thead>
          <tr>
            <th>Security Code</th>
            <th>Net Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((pos) => (
            <tr key={pos.securityCode}>
              <td>{pos.securityCode}</td>
              <td>{pos.quantity > 0 ? `+${pos.quantity}` : pos.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PositionsTable;