import sequelize from "../config/database.js";
import Transaction from "./TransactionModel.js  ";
import { DataTypes } from "sequelize";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("Seen", "Unseen"),
    },
    transactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Transaction,
        key: "id",
      },
    },
  },
  { timestamps: true }
);

Transaction.hasOne(Notification, {
  foreignKey: "notificationId",
  as: "transaction",
});

Notification.belongsTo(Transaction, {
  foreignKey: "transactionId",
  as: "transaction",
});

export default Notification;
