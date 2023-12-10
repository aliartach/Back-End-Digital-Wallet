import { User, Promotion, Notification, Transaction } from "../models/index.js";

export const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      include: [{ model: User, as: "user" }], order: [["id", "DESC"]]
    });
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPromotion = async (req, res) => {
  try {
    const findUser = await User.findByPk(req.body.userId);
    if (!findUser) {
      return res.json({ error: "User not defined" });
    }
    const promotion = await Promotion.create(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id, {
      include: [{ model: User, as: "user" }],
    });
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, promoCode, description, percentage,userId } = req.body;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    if (startDate) {
      promotion.startDate = startDate;
    }
    if (endDate) {
      promotion.endDate = endDate;
    }
    if (promoCode) {
      promotion.promoCode = promoCode;
    }
    if (description) {
      promotion.description = description;
    }
    if (percentage) {
      promotion.percentage = percentage;
    }
    if (userId) {
      const findUser = await User.findByPk(userId);
      if (!findUser) {
        return res.json({ error: "User not defined" });
      }
      promotion.userId = userId;
    }

    await promotion.save();

    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    await promotion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
