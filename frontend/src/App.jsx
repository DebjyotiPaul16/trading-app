import React, { useState } from 'react';
import PositionsTable from './components/PositionsTable/PositionsTable';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { useQueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import './index.css';

function App() {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries('positions');
    queryClient.invalidateQueries('transactions');
  };

  return (
    <div className="app-container">
      <h1>Trader Dashboard</h1>
      <TransactionForm onSuccess={handleSuccess} selectedTrade={selectedTrade} />
      <div className="tables">
        <PositionsTable />
        <TransactionsTable onSelectTrade={setSelectedTrade} />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;