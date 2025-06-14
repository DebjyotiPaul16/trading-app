import React, { useState } from 'react';
import PositionsTable from './components/PositionsTable/PositionsTable';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { useQueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import './index.css';

function App() {
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.invalidateQueries('positions');
        queryClient.invalidateQueries('transactions');
        setIsModalOpen(false);
        setSelectedTrade(null);
    };

    const handleNewClick = () => {
        setSelectedTrade(null);
        setIsModalOpen(true);
    };

    return (
        <div className="app-container">
            <h1>Trader Dashboard</h1>
            <button onClick={handleNewClick} className="primary-btn">New Transaction</button>

            <div className="tables">
                <PositionsTable />
                <TransactionsTable onSelectTrade={(tx) => {
                    setSelectedTrade(tx);
                    setIsModalOpen(true);
                }} />
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="modal-close">×</button>
                        <TransactionForm onSuccess={handleSuccess} selectedTrade={selectedTrade} />
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default App;
