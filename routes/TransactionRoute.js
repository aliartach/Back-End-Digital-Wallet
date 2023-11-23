import express from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/TransactionController.js';

const TransactionRoute = express.Router();

// Routes
TransactionRoute.get('/transactions', getAllTransactions);
TransactionRoute.get('/transactions/:id', getTransactionById);
TransactionRoute.post('/transactions', createTransaction);
TransactionRoute.patch('/transactions/:id', updateTransaction);
TransactionRoute.delete('/transactions/:id', deleteTransaction);

export default TransactionRoute;

