import { Transaction, User, Promotion } from "../models/index.js";
import sequelize from "../config/database.js";

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: "sender" },
        { model: User, as: "receiver" },
        { model: Promotion, as: "promotion" },
      ],
      order: [["id", "DESC"]],
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
    return res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  const { amount, date, senderId, receiverEmail, promoCode } = req.body;
  let { moneyType } = req.body;
  
  if (!amount || !moneyType || !senderId || !receiverEmail) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sender = await User.findByPk(senderId);
    if (!sender) {
      return res.status(404).json({ error: "Invalid sender" });
    }
    const receiver = await User.findOne({ where: { email: receiverEmail } });

    if (!receiver) {
      return res.status(404).json({ error: "Invalid receiver Email " });
    }

    let promotion = null;
    let discount = 0;
    let newAmount = amount;

    if (promoCode) {
      promotion = await Promotion.findOne({
        where: { promoCode: promoCode },
      });

      if (!promotion) {
        return res.status(404).json({ error: "Invalid promotion" });
      }

      discount = promotion.percentage;
      newAmount = amount - (amount * discount) / 100;
    }

    if (moneyType === "usd") {
      if (sender.balanceUSD < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      await sender.decrement({ balanceUSD: newAmount });
      await receiver.increment({ balanceUSD: newAmount });
      await receiver.decrement({ balanceUSDT: amount });
      await sender.increment({ balanceUSDT: amount });
    } else if (moneyType === "usdt") {
      if (sender.balanceUSDT < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      await sender.decrement({ balanceUSDT: amount });
      await receiver.increment({ balanceUSDT: amount });
    } else if (moneyType === "usdDeposit") {
      moneyType = "usd";
      await receiver.increment({ balanceUSD: amount });
      await sender.decrement({ balanceUSD: amount });
    } else {
      return res.status(400).json({ error: "Invalid money type" });
    }

    await Transaction.create({
      amount: newAmount,
      date,
      moneyType,
      senderId,
      receiverId: receiver.id,
      promotionId: promoCode ? promotion.id : null,
    });

    return res
      .status(200)
      .json({ success: true, message: "Money sent successfully" });
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return res.status(500).json({ error: "Failed to create transaction" });
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
