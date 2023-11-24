import { User, Promotion, Notification, Transaction } from "../models/index.js";

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: Transaction, as: "transaction" }],
    });
    res.json(notifications);
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Get a single notification by ID
export const getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id, {
      include: [{ model: Transaction, as: "transaction" }],
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    console.error("Failed to fetch notification:", error);
    res.status(500).json({ error: "Failed to fetch notification" });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  const { seen, message, transactionId } = req.body;
  try {
    if (!transactionId) {
      return res.status(404).json({ error: "TransactionId Required" });
    }

    if (!message) {
      return res.status(404).json({ error: "Message Required" });
    }

    const notification = await Notification.create({
      seen,
      message,
      transactionId,
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error("Failed to create notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

// Update an existing notification
export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { seen, message, transactionId } = req.body;
  try {
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (seen) {
      notification.seen = seen;
    }
    if (message) {
      notification.message = message;
    }
    if (transactionId) {
      notification.transactionId = transactionId;
    }
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error("Failed to update notification:", error);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    await notification.destroy();
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Failed to delete notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
};
