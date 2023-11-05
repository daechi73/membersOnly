const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().populate("user").exec();
  res.render("index", {
    title: "Comment List",
    comments: comments,
    user: req.user,
  });
});
