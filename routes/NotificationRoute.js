import express from "express";
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/NotificationController.js";

const router = express.Router();

router.get("/notifications", getAllNotifications);

router.get("/notifications/:id", getNotificationById);

router.post("/notifications/", createNotification);

router.put("/notifications/:id", updateNotification);

router.delete("/notifications/:id", deleteNotification);

export default router;
