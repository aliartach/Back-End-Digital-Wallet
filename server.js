import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";
import jwt from "jsonwebtoken";

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

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("request by:", req.user);
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

app.use("/api", authenticateToken, userRoutes);
app.use("/api", authenticateToken, transactionRoutes);
app.use("/api", authenticateToken, promotionRouter);
app.use("/api", authenticateToken, notificationRouter);

//listen to port
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
