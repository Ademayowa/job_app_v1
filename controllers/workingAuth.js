const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const User = require('../models/User');

const validateSignup = require('../validation/signup');
const validateSignin = require('../validation/signin');

/**
 * @description  Register user
 * @route  POST api/v1/auth/register
 * @returns {Object} token
 * @access public
 */
exports.signup = async (req, res) => {
	const { isValid, errors } = validateSignup(req.body);

	try {
		// Check user input validation
		if (!isValid) return res.status(400).json(errors);

		const { username, email, password } = req.body;

		// Check if email already exist
		let user = await User.findOne({ email });

		if (user) {
			errors.email = 'Email already exist';
			return res.status(400).json(errors);
		}

		// create new user
		user = new User({
			username,
			email,
			password
		});

		// Hash password
		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);
		// Save student
		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE },
			(err, token) => {
				if (err) throw err;
				res.status(201).json({
					success: true,
					data: token
				});
			}
		);
	} catch (err) {
		console.error(err.stack);
		res.status(500).send('Something went wrong!');
	}
};

/**
 * @description  Login user
 * @route  POST api/v1/auth/login
 * @returns {Object} token & username
 * @access public
 */
exports.signin = async (req, res) => {
	const { isValid, errors } = validateSignin(req.body);
	// Check validation
	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;

	try {
		// Find user by an existing email
		let user = await User.findOne({ email });
		if (!user) {
			errors.email = 'Invalid email or password';
			return res.status(401).json(errors);
		}

		// Compare password
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			errors.password = 'Invalid email or password';
			return res.status(401).json(errors);
		}

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE },
			(err, token) => {
				if (err) throw err;
				res.status(200).json({
					success: true,
					username: user.username,
					data: token
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Something went wrong!');
	}
};
