import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import sequelize from "./config/database.js";
//Routes
import userRoutes from "./routes/UserRoutes.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  // res.header("Access-Control-Max-Age", "3600");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
  // );
  console.log(req.path, req.method);
  next();
});

app.use("/api", userRoutes);
//listen to port
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
