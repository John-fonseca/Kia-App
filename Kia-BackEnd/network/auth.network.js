const express = require("express");
const router = express.Router();
const AuthController = require("../src/components/auth/registro/controller");
const {
  validateRegister,
} = require("../src/components/auth/registro/middleware");
const { validateLogin } = require("../src/components/auth/login/middleware");
const LoginController = require("../src/components/auth/login/controller");

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, LoginController.login);



module.exports = router;
