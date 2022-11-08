const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user.model");

require("dotenv").config();

// SIGNUP LOGIC

const signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json("username and email must be unique");
    }
    
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) { 
      return res.status(400).json("username and email must be unique");
    }
    const newUser = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
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
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

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
