const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const HashedPassword = require("../public/javascripts/HashPassword");

exports.profile = asyncHandler(async (req, res, next) => {
  res.send("profile implemented YEt");
});

exports.sign_in_get = asyncHandler(async (req, res, next) => {
  res.render("sign-in-get", {
    title: "Sign-in",
  });
});

exports.sign_in_post = [
  asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, options) => {
      if (!user) {
        res.render("sign-in-get", {
          title: "Sign-in",
          errors: options.message,
        });
      } else next();
    })(req, res, next);
  }),
  passport.authenticate("local", {
    successRedirect: "/",
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
  res.render("sign-up-get", {
    title: "Sign-up",
  });
});
exports.sign_up_post = [
  body("first_name")
    .trim()
    .exists()
    .withMessage("You must Enter a first name")
    .isLength({ min: 3 })
    .withMessage("first name has to be atleast 3 characters long"),
  body("last_name")
    .trim()
    .exists()
    .withMessage("You must Enter a last name")
    .isLength({ min: 3 })
    .withMessage("last name has to be atleast 3 characters long"),
  body("username")
    .trim()
    .exists()
    .withMessage("You must Enter a username")
    .isLength({ min: 3 })
    .withMessage("Username has to be atleast 3 characters long")
    .custom(async (value) => {
      const user = await User.findOne({ user_name: value }).exec();
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .trim()
    .exists()
    .withMessage("You must enter a password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be atleast 8 charaters that includes: 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    ),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.username,
      password: await HashedPassword(req.body.password),
    });
    if (!errors.isEmpty()) {
      res.render("sign-up-get", {
        title: "Sign-up",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      console.log("here");
      await user.save();
      res.redirect("/user/sign-in");
    }
  }),
];
