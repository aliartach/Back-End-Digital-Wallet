import User from "./User.js";
import Transaction from "./TransactionModel.js";
import Promotion from "./promotionModel.js";
import Notification from "./NotificationModel.js";

User.hasMany(Promotion, {
  foreignKey: "userId",
  as: "promotions",
});

Promotion.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Transaction, {
   foreignKey: "senderId",
    as: "sentTransactions"
   });

User.hasMany(Transaction, {
  foreignKey: "receiverId",
  as: "receivedTransactions",
});

Transaction.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});

Transaction.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiver",
});
Promotion.hasMany(Transaction, {
  foreignKey: "promotionId",
  as: "transactions",
});

Transaction.belongsTo(Promotion, {
  foreignKey: "promotionId",
  as: "promotion",
});

Notification.belongsTo(Transaction, {
  foreignKey: "transactionId",
  as: "transaction",
});

Transaction.hasMany(Notification, {
  foreignKey: "transactionId",
  as: "notifications",
});

//Export the models
export { User, Promotion, Notification, Transaction };
