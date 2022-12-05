const express = require('express');
const controller = require('../controllers/goalsController');
const { protect } = require('../middlewares/validateToken');

const router = express.Router();

router
	.route('/')
	.get(protect, controller.getGoals)
	.post(protect, controller.createGoal);

router
	.route('/:id')
	.put(protect, controller.updateGoal)
	.delete(protect, controller.deleteGoal);

module.exports = router;
