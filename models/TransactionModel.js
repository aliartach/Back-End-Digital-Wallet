// models/Transaction.js
import { DataTypes } from 'sequelize';
import Sequelize from '../config/database.js'; 
import User from './User.js';
import Promotion from './Promotion.js';
const Transaction = Sequelize.define('Transaction', {
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
 },
  amount: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moneyType: {
    type: DataTypes.ENUM('USD', 'USDT'),
    allowNull: false,
  }, 
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  // promotionsId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Promotion,
  //     key: 'id',
  //   },
  // }, 

} , { timestamps: true });

// Transaction.pre('find', function(next) {
//   this.populate('Users');
//   next();
// });
// Transaction.pre('find', function(next) {
//   this.populate('Promotion');
//   next();
// });


User.hasMany(Transaction, { foreignKey: 'senderId', as: 'sentTransactions' });
User.hasMany(Transaction, { foreignKey: 'receiverId', as: 'receivedTransactions' });

Transaction.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Transaction.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
  
Promotion.hasOne(Transaction, { foreignKey: 'promotionsId', as: 'transaction' });
Transaction.belongsTo(Promotion, { foreignKey: 'promotionsId', as: 'promotion' });

export default Transaction;