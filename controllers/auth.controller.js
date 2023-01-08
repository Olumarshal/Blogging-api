const jwt = require("jsonwebtoken");
const passport = require("passport");
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require("../errors/bad-request")
const User = require("../models/user.model");

require("dotenv").config();

// SIGNUP LOGIC

const signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json("username not available");
    }
    
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) { 
      return res.status(400).json("email already used");
    }
    const newUser = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Signup successful",
      newUser,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// LOGIN LOGIC
const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("Invalid Credentials");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = {
  signup,
  login,
};
