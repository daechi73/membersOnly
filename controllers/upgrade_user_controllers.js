const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");
const User = require("../models/user");
exports.handle_post = [
  body("answer")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Empty answer is not the right answer")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const comments = await Comment.find().populate("user").exec();
    const errors = validationResult(req);
    let wrongAnswer;
    if (req.user.status === "WannaBe") {
      if (req.body.answer !== "2")
        wrongAnswer = `${req.body.answer} is not the right answer`;
      if (req.body.answer === "") wrongAnswer = "";
    }
    if (req.user.status === "Member") {
      if (req.body.answer !== "100")
        wrongAnswer = `${req.body.answer} is not the right answer`;
      if (req.body.answer === "") wrongAnswer = "";
    }

    if (!errors.isEmpty() || wrongAnswer) {
      res.render("index", {
        title: "Comments",
        comments: comments,
        signedInUser: req.user,
        errors: errors.array(),
        wrongAnswer: wrongAnswer,
      });
    } else {
      const user = new User({
        ...req.user,
        status: req.user.status === "WannaBe" ? "Member" : "VIP",
        _id: req.user._id,
      });
      const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        user,
        {}
      ).exec();
      res.redirect("/");
    }
  }),
];
