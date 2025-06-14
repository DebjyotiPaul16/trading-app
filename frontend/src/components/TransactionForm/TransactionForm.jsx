import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { createTransaction, updateTransaction, cancelTransaction } from '../../services/api';
import { toast } from 'react-toastify';

function TransactionForm({ onSuccess, selectedTrade }) {
  const [form, setForm] = useState({
    tradeId: '',
    securityCode: '',
    quantity: '',
    operation: 'Buy'
  });

  useEffect(() => {
    if (selectedTrade && selectedTrade.action !== 'CANCEL') {
      setForm({
        tradeId: selectedTrade.tradeId,
        securityCode: selectedTrade.securityCode,
        quantity: selectedTrade.quantity,
        operation: selectedTrade.operation
      });
    } else {
      setForm({
        tradeId: '',
        securityCode: '',
        quantity: '',
        operation: 'Buy'
      });
    }
  }, [selectedTrade]);

  const mutation = useMutation(
      (payload) => {
        const withCreatedBy = { ...payload, createdBy: 'system' };
        if (withCreatedBy.action === 'UPDATE') return updateTransaction(withCreatedBy);
        if (withCreatedBy.action === 'CANCEL') return cancelTransaction(withCreatedBy.tradeId, withCreatedBy.createdBy);
        return createTransaction(withCreatedBy);
      },
      {
        onSuccess: (res) => {
          toast.success(res);
          setForm({ tradeId: '', securityCode: '', quantity: '', operation: 'Buy' });
          onSuccess();
        },
        onError: () => {
          toast.error('Unable to place trade. Please try again.');
        }
      }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = selectedTrade ? 'UPDATE' : 'INSERT';
    mutation.mutate({ ...form, action });
  };

  const handleCancel = () => {
    mutation.mutate({ tradeId: form.tradeId, action: 'CANCEL' });
  };

  return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <h2 style={{ width: '100%' }}>{selectedTrade ? 'Update Transaction' : 'New Transaction'}</h2>

        <input
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Security Code"
            value={form.securityCode}
            onChange={(e) => setForm({ ...form, securityCode: e.target.value })}
            required
        />

        <input
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
        />

        <select
            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            value={form.operation}
            onChange={(e) => setForm({ ...form, operation: e.target.value })}
        >
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>

        <button
            type="submit"
            style={{ padding: '8px 16px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Submit
        </button>

        {selectedTrade && selectedTrade.action !== 'CANCEL' && (
            <button
                type="button"
                onClick={handleCancel}
                style={{ padding: '8px 16px', backgroundColor: '#c0392b', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Cancel Trade
            </button>
        )}
      </form>
  );
}

export default TransactionForm;
