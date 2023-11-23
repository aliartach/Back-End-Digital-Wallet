import express from  "express";
import dotenv from 'dotenv';
import promotionRouter from "../routes/PromotionRoute.js";

const app = express();

// Middleware
app.use(express.json());
dotenv.config();

app.use('/promotions', promotionRouter)

//listen to port 
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
  });



