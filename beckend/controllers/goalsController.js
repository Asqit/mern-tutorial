const asyncHandler = require('express-async-handler');

/**
 * **Description:** get goals
 *
 * **Route:** `GET` /api/goals
 *
 * **Access:** private
 */
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'GET goals',
	});
});

/**
 * **Description:** create goal
 *
 * **Route:** `POST` /api/goals
 *
 * **Access:** private
 */
const createGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'SET goals',
	});
});

/**
 * **Description:** update goal
 *
 * **Route:** `PUT` /api/goals
 *
 * **Access:** private
 */
const updateGoal = asyncHandler(async (req, res) => {
	const { text } = req.body;

	if (!text) {
		res.status(400);
		throw new Error('Please add text');
	}

	res.status(200).json({
		message: 'PUT goals',
	});
});

/**
 * **Description:** deletes goal
 *
 * **Route:** `DELETE` /api/goals
 *
 * **Access:** private
 */
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'DELETE goals',
	});
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
