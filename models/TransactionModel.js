// models/Transaction.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Amount must be greater than or equal to 0",
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    moneyType: {
      type: DataTypes.ENUM("usd", "usdt"),
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    promotionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Promotion",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default Transaction;
