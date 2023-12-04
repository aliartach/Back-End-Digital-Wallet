import express from "express";
import {
  getPromotions,
  createPromotion,
  getPromotion,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotionController.js";

const router = express.Router();

router.get("/promotions", getPromotions);

router.post("/promotions", createPromotion);

router.get("/promotions/:id", getPromotion);

router.put("/promotions/:id", updatePromotion);

router.delete("/promotions/:id", deletePromotion);

export default router;
