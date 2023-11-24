import { User, Promotion, Notification, Transaction } from "../models/index.js";

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
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

export { getUsers, getUserById, createUser, updateUser, deleteUser };
