import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";
import { authenticateToken } from "./middleware/auth.js";

//Routes
import signInRoute from "./routes/SignIn.js";
import userRoutes from "./routes/UserRoutes.js";
import transactionRoutes from "./routes/TransactionRoute.js";
import promotionRouter from "./routes/promotionRoute.js";
import notificationRouter from "./routes/NotificationRoute.js";
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", signInRoute);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", userRoutes);
app.use("/api", transactionRoutes);
app.use("/api", authenticateToken, promotionRouter);
app.use("/api",  userRoutes);
app.use("/api",  transactionRoutes);
app.use("/api",  promotionRouter);
app.use("/api", authenticateToken, notificationRouter);

//listen to port
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
