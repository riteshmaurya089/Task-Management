const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

// Register a new user
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill all the details!!" });
  }

  try {
    // Check if the user already exists by email
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: "User already exists. Please login!",
      });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 5);

    // Create new user with hashed password
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hash,
    });

    // Respond with success message
    res.json({ message: "User signed up successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }
    
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userRegister, userLogin };
