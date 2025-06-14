import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/trader-app';

export const getPositions = async () => {
  const res = await axios.get(`${BASE_URL}/positions`);
  return res.data;
};

export const getTransactions = async () => {
  const res = await axios.get(`${BASE_URL}/transactions`);
  return res.data;
};

export const createTransaction = async (tx) => {
  const res = await axios.post(`${BASE_URL}/transactions`, tx);
  return res.data;
};

export const updateTransaction = async (tx) => {
  const res = await axios.put(`${BASE_URL}/transactions`, tx);
  return res.data;
};

export const cancelTransaction = async (tradeId, createdBy) => {
  const res = await axios.delete(`${BASE_URL}/transactions/${tradeId}?createdBy=${createdBy}`);
  return res.data;
};