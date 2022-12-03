const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

/**
 * **Description:** get goals
 *
 * **Route:** `GET` /api/goals
 *
 * **Access:** private
 */
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();

	res.status(200).json(goals);
});

/**
 * **Description:** create goal
 *
 * **Route:** `POST` /api/goals
 *
 * **Access:** private
 */
const createGoal = asyncHandler(async (req, res) => {
	const { text } = req.body;

	if (!text) {
		res.status(400);
		throw new Error(`Invalid request. missing a text field`);
	}

	const goal = await Goal.create({ text });

	res.status(200).json(goal);
});

/**
 * **Description:** update goal
 *
 * **Route:** `PUT` /api/goals
 *
 * **Access:** private
 */
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error("Invalid request. Missing goal's id");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updateGoal);
});

/**
 * **Description:** deletes goal
 *
 * **Route:** `DELETE` /api/goals
 *
 * **Access:** private
 */
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal was not found');
	}

	await goal.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
