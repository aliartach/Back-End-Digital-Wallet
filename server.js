// Your main application file
import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import transactionRoutes from "./routes/TransactionRoute.js"

const app = express();
app.use(express.json());
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});


app.use('/api', transactionRoutes);




