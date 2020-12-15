import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @description  Register user
 * @route  POST api/v1/auth/register
 * @returns {Object} token
 * @access public
 */
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Create user.
  // getSignedJwtToken is from userSchema.methods in d user model
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

/**
 * @description  Login user
 * @route  POST api/v1/auth/login
 * @returns {Object} token
 * @access public
 */
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & passwword
  if (!email || !password) {
    res.status(400);
    throw new Error('Enter email or password');
  }

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  // password here is from d body
  const match = await user.matchPassword(password);

  if (!match) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Create token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

/**
 * @description  Current loggedin user
 * @route  GET api/v1/auth/current
 * @returns {Object} token
 * @access private
 */
const current = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, user });
});

export { signin, signup, current };
