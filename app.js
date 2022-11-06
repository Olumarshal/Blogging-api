const express = require("express");
const bodyParser = require("body-parser");

const User = require("./models/user.model");

// SIGNUP AND LOGIN MIDDLEWARE
require("./authentication/auth");

const blogRouter = require("./routes/blog.route");
const authRouter = require("./routes/auth.route");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api/v1/blog", authRouter);
app.use("/api/v1/blog", blogRouter);

// home route
app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'The Blog Api Home Route'
  });
});

// 404 route
app.use("*", (req, res) => {
  return res.status(404).json({ message: "route not found" });
});

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
