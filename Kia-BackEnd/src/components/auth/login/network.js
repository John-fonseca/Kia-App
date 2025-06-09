const express = require('express');
const router = express.Router();
const LoginController = require('./controller');
const { validateLogin } = require('./middleware');

router.post('/login', validateLogin, LoginController.login);

module.exports = router;