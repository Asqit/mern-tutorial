const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * **Description:** creates a new user
 *
 * **Route:** `POST` /api/users
 *
 * **Access:** private
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(409);
		throw new Error('Email already in use');
	}

	const SALT = await bcrypt.genSalt(10);
	const HASHED_PASSWORD = await bcrypt.hash(password, SALT);

	const newUser = await User.create({
		email,
		name,
		password: HASHED_PASSWORD,
	});

	if (newUser) {
		res.status(201).json({
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			token: generateToken({ id: newUser._id }),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

/**
 * **Description:** creates a new user
 *
 * **Route:** `POST` /api/users
 *
 * **Access:** private
 */

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email });

	// Check passwords
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken({ id: user._id }),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

/**
 * **Description:** get user's details
 *
 * **Route:** `GET` /api/users/me
 *
 * **Access:** private
 */
const getMe = asyncHandler(async (req, res) => {
	res.status(200).json({
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	});
});

const generateToken = (id) => {
	return jwt.sign(id, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = { registerUser, loginUser, getMe };
