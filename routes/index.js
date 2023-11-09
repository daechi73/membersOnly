var express = require("express");
var router = express.Router();
const comment_controller = require("../controllers/comment_controller");
const upgrade_user_controller = require("../controllers/upgrade_user_controllers");
/* GET home page. */
router.get("/", comment_controller.comment_list);
router.post("/", upgrade_user_controller.handle_post);

router.get("/comments", comment_controller.comment_create_get);
router.post("/comments", comment_controller.comment_create_post);

module.exports = router;
