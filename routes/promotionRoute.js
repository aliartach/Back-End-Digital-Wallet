import promotionController from "../controllers/promotionController.js";
import express from "express";

const promotionRouter = express.Router()


//get all promotions
promotionRouter.get('/' , promotionController.getPromotions)

//create a promotion
promotionRouter.post('/' , promotionController.createPromotion)


export default promotionRouter