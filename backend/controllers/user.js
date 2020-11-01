const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const User = require('../models/User');
const asyncMiddleware = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description  Register user
 * @route  POST api/v1/auth/register
 * @returns {Object} token
 * @access public
 */
exports.signup = asyncMiddleware(async (req, res, next) => {
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
exports.signin = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & passwword
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  // password here is from d body
  const match = await user.matchPassword(password);

  if (!match) {
    return next(new ErrorResponse('Invalid credentials', 401));
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
exports.current = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  .select('-password');
  res.status(200).json({ success: true, user });
});
