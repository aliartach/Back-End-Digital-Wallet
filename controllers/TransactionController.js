import { User , Promotion , Transaction} from "../models/index.js"


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
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};
export const createTransaction = async (req, res) => {
  try {
    const { amount, date, moneyType } = req.body;

   
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    if (promotionsId) {
      const promotion = await Promotion.findByPk(promotionsId);
      if (!promotion) {
        return res.status(404).json({ error: 'Promotion not found' });
      }
    }

    // Create transaction
    const transaction = await Transaction.create({
      amount,
      date,
      moneyType: moneyType.toUpperCase()
    });

    return res.status(200).json({ success: true, message: "Money sent successfully" });
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
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }


    if (promotionsId) {
      const promotion = await Promotion.findByPk(promotionsId);
      if (!promotion) {
        return res.status(404).json({ error: 'Promotion not found' });
      }
    }


    await transaction.update({
      amount,
      date,
      moneyType: moneyType.toUpperCase()
    });

    return res.status(200).json(transaction);
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
