import sequelize from "../config/database.js";
import { DataTypes } from 'sequelize';

const Notification = sequelize.define('Notification', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    transactionId:{
        type: DataTypes.INTEGER,
        references: {
            model: Transaction,
            key: 'id'
        }
    },
    status:{
        type: DataTypes.ENUM
    }
    
}, {timestamps: true})

Transaction.hasOne(Notification, {foreignKey: 'notificationId', as: 'transaction'} );

Notification.belongsTo(Transaction, {foreignKey: 'transactionId', as: 'transaction'});

Notification.sync();

export default Notification;

