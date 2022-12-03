const express = require('express');
const controller = require('../controllers/goalsController');

const router = express.Router();

router.route('/').get(controller.getGoals).post(controller.createGoal);

router.route('/:id').put(controller.updateGoal).delete(controller.deleteGoal);

module.exports = router;
