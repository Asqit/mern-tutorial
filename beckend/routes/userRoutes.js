const express = require('express');
const controller = require('../controllers/usersController');
const { protect } = require('../middlewares/validateToken');

const router = express.Router();

// register a new user
router.post('/', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/me', protect, controller.getMe);

module.exports = router;
