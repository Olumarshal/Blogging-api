const express = require('express')
const passport = require('passport');

const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router();

// REGISTER
authRouter.post('/signup', AuthController.signup);


// LOGIN
authRouter.post("/login", AuthController.login );

module.exports = authRouter;