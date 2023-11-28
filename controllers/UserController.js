import { User, Promotion, Notification, Transaction } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "DESC"]]});
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Create a new user
const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.errors[0].message);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      Object.assign(user, updatedFields);
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json("Email not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect password");
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: user.id ,role:user.role,email:user.email}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.status(200).json({
      sucess: true,
      id: user.id,
      email: user.email,
      accessToken: token,
      role:user.role
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
};
