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
    // userId:{
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: user,
    //         key: 'id'
    //     }
    // }
    });

    // User.hasMany(Promotion, { foreignKey: 'userId', as : 'userid'});
    
    Promotion.sync();
    
    export default Promotion;






