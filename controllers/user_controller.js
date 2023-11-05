const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.profile = asyncHandler(async (req, res, next) => {
  res.send("profile implemented YEt");
});

exports.sign_in_get = asyncHandler(async (req, res, next) => {
  res.render("sign-in-get", {
    title: "Sign-in",
  });
});
// exports.sign_in_post = [
//   body("password").trim().exists().withMessage("You must enter a password"),
//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req);

//     res.send("sign_in not implemented yet");
//   }),
// ];

exports.sign_in_post = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/sign-in",
  }),
];
exports.sign_out = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.send("sign_up not implemented yet");
});
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  res.send("sign_up not implemented yet");
});
