import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

// GET /users
router.get("/users", getUsers);

// GET /users/:id
router.get("/users/:id", getUserById);

// POST /users
router.post("/users", createUser);

// PUT /users/:id
router.put("/users/:id", updateUser);

// DELETE /users/:id
router.delete("/users/:id", deleteUser);

export default router;