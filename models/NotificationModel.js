import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Transaction",
        key: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
  },
  { timestamps: true }
);

export default Notification;
