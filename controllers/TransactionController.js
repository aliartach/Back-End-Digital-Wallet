import { Transaction, User, Promotion } from "../models/index.js";

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: "sender" },
        { model: User, as: "receiver" },
        { model: Promotion, as: "promotion" },
      ],
    });
    res.json(transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id, {
      include: [
        { model: User, as: "sender" },
        { model: User, as: "receiver" },
        { model: Promotion, as: "promotion" },
      ],
    });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    console.error("Failed to fetch transaction:", error);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  const {
    amount,
    date,
    moneyType,
    senderId,
    receiverId,
    promotionId,
  } = req.body;
  try {
    const sender = await User.findByPk(senderId);
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const promotion = await Promotion.findByPk(promotionId);
    if (promotionId && !promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    const transaction = await Transaction.create({
      amount,
      date,
      moneyType,
      senderId,
      receiverId,
      promotionId,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Failed to create transaction:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

// Update an existing transaction
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const {
    amount,
    date,
    moneyType,
    senderId,
    receiverId,
    promotionId,
  } = req.body;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const sender = await User.findByPk(senderId);
    if (senderId && !sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    const receiver = await User.findByPk(receiverId);
    if (receiverId && !receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const promotion = await Promotion.findByPk(promotionId);
    if (promotionId && !promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    transaction.amount = amount;
    transaction.date = date;
    transaction.moneyType = moneyType;
    transaction.senderId = senderId;
    transaction.receiverId = receiverId;
    transaction.promotionId = promotionId;

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error("Failed to update transaction:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await transaction.destroy();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
