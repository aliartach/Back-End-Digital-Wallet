import sequelize from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize";

const Promotion = sequelize.define("Promotion", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default Promotion;
