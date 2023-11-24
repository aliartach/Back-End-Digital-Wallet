import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";

//Routes
import userRoutes from "./routes/UserRoutes.js";
import transactionRoutes from "./routes/TransactionRoute.js"
import promotionRouter  from "./routes/promotionRoute.js";
import notificationRouter from "./routes/NotificationRoute.js";
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", userRoutes);
app.use('/api', transactionRoutes);
app.use('/api', promotionRouter )
app.use('/api', notificationRouter )

//listen to port 
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
  });

