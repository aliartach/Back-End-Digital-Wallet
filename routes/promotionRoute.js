import promotionController from "../controllers/promotionController.js";
import express from "express";

const promotionRouter = express.Router()

//get a promotion
promotionRouter.get('/:id', promotionController.getPromotion)


//get all promotions
promotionRouter.get('/' , promotionController.getPromotions)

//create a promotion
promotionRouter.post('/' , promotionController.createPromotion)

//update a promotion
promotionRouter.patch('/:id', promotionController.updatePromotion)

//delete a promotion
promotionRouter.delete('/:id', promotionController.deletePromotion)


export default promotionRouter
