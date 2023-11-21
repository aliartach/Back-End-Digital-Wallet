import sequelize from "../config/database.js";
import { DataTypes } from 'sequelize';

const Promotion = sequelize.define('Promotion', {
    id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true
    },
    description:{
        type: DataTypes.STRING
    },
    startDate:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    endDate:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    promoCode:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    percentage:{
       type: DataTypes.STRING,
    },
    });
    
    Promotion.sync();
    
    export default Promotion;






