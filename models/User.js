import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "First name is required" },
      notEmpty: { msg: "First name is must not be empty" },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Last name is required" },
      notEmpty: { msg: "Last name must not be empty" },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: "Email is required" },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  balanceUSD: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  balanceUSDT: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.ENUM("admin", "user", "merchant"),
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
