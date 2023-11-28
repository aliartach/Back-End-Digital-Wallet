import express from "express";
import { signInUser,createUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/users/signin", signInUser);
router.post("/users", createUser);

export default router;
