import axios from 'axios';

const API_URL = '/api/goals/';

// Create a new goal service
const createGoal = async (goalData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const resp = await axios.post(API_URL, goalData, config);

	return resp.data;
};

// Get all goals
const getGoals = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const resp = await axios.get(API_URL, config);

	return resp.data;
};

// Remove a goal
const deleteGoal = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const resp = await axios.delete(API_URL + goalId, config);

	return resp.data;
};

const goalService = {
	createGoal,
	getGoals,
	deleteGoal,
};

export default goalService;
