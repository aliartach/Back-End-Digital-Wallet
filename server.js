import express from  "express";
import dotenv from 'dotenv';


const app = express();


// Middleware
app.use(express.json());
dotenv.config();

//listen to port 
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
  });