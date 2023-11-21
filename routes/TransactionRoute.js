import express from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/TransactionController.js';

const router = express.Router();

// Routes
router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', createTransaction);
router.patch('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;

