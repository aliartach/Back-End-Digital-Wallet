import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Promotion = sequelize.define("Promotion", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Description is required" },
      notEmpty: { msg: "Description must not be empty" },
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "Start date is required" },
      notEmpty: { msg: "Start date must not be empty" },
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "End date is required" },
      notEmpty: { msg: "End date must not be empty" },
    },
  },
  promoCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  percentage: {
    type: DataTypes.FLOAT(4, 2),
    allowNull: false,
    validate: {
      notNull: { msg: "Percentage is required" },
      notEmpty: { msg: "Percentage must not be empty" },
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      model: "User",
      key: "id",
      as: "userId",
    },
  },
});

export default Promotion;
