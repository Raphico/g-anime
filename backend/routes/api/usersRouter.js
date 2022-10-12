const express = require('express');
const router = express.Router();
const { registerUser, logUser, logUserSecurityQuestion } = require('../../controllers/usersController');

// Register user
router.post('/', registerUser);

// Login user
router.post('/login', logUser);

// login using security question
router.post('/login-security-question', logUserSecurityQuestion);

module.exports = router;
