import express from "express";
import { signInUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/users/signin", signInUser);

export default router;
