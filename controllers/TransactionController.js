import Transaction from "../models/TransactionModel.js";
import User from "../models/User.js";
// import Promotion from '../models/Promotion.js';

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createTransaction = async (req, res) => {
  try {
    const { amount, date, moneyType } = req.body;

   
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    // if (promotionsId) {
    //   const promotion = await Promotion.findByPk(promotionsId);
    //   if (!promotion) {
    //     return res.status(404).json({ error: 'Promotion not found' });
    //   }
    // }

    // Create transaction
    const transaction = await Transaction.create({
      amount,
      date,
      moneyType: moneyType.toUpperCase()
    });

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, moneyType, senderId, receiverId, promotionsId } = req.body;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }


    // if (promotionsId) {
    //   const promotion = await Promotion.findByPk(promotionsId);
    //   if (!promotion) {
    //     return res.status(404).json({ error: 'Promotion not found' });
    //   }
    // }


    await transaction.update({
      amount,
      date,
      moneyType: moneyType.toUpperCase()
    });

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Delete transaction
    await transaction.destroy();

    return res.status(204).json(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

