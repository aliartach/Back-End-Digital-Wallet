import NotificationController from "../controllers/NotificationController.js";
import express from "express";

const notificationRouter = express.Router()

//get a notification
notificationRouter.get('/:id', NotificationController.getNotification)


//get all Notifications
notificationRouter.get('/' , NotificationController.getNotifications)

//create a Notification
notificationRouter.post('/' , NotificationController.createNotification)

//update a Notification
notificationRouter.patch('/:id', NotificationController.updateNotification)

//delete a Notification
notificationRouter.delete('/:id', NotificationController.deleteNotification)


export default notificationRouter