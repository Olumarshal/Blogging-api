const jwt = require("jsonwebtoken");
const passport = require('passport');
const User = require("../models/user.model");


require("dotenv").config();

// SIGNUP LOGIC

const signup = async (req, res, next) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }
  return res.status(201).json({
    message: "Signup successful",
    user: req.user,
  });
};

// LOGIN LOGIC
const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) 
        return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
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
