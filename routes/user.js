var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/user_controller");

/* GET users listing. */

router.get("/sign-in", user_controller.sign_in_get);
router.get("/sign-up", user_controller.sign_up_get);
router.get("/:id", user_controller.profile);

module.exports = router;
