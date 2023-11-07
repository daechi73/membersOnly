var express = require("express");
var router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/user_controller");

/* GET users listing. */

router.get("/sign-in", user_controller.sign_in_get);
router.post("/signed-in", user_controller.sign_in_post);
router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);
router.get("/sign-out", user_controller.sign_out);
router.get("/:id", user_controller.profile);

module.exports = router;
