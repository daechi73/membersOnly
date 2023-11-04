const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.profile = asyncHandler(async (req, res, next) => {
  res.send("profile implemented YEt");
});

exports.sign_in_get = asyncHandler(async (req, res, next) => {
  res.render("sign-in-get");
});
exports.sign_in_post = asyncHandler(async (req, res, next) => {
  res.send("sign_in not implemented yet");
});

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.send("sign_up not implemented yet");
});
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  res.send("sign_up not implemented yet");
});
