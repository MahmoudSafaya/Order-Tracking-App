const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getProfile } = require('../controllers/authControllers');

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/profile', getProfile);

module.exports = router;