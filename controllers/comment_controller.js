const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().populate("user").exec();
  res.render("index", {
    title: "Comment List",
    comments: comments,
    signedInUser: req.user,
  });
});

exports.comment_create_get = asyncHandler(async (req, res, next) => {
  res.render("comment-create-get", {
    signedInUser: req.user,
  });
});

exports.comment_create_post = [
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("You have to enter a comment"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("comment-create-get", {
        signedInUser: req.user,
        errors: errors,
      });
    } else {
      const comment = new Comment({
        user: req.body.user,
        comment: req.body.comment,
      });
      await comment.save();
      res.redirect("/");
    }
  }),
];
