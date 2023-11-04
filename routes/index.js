var express = require("express");
var router = express.Router();
const comment_controller = require("../controllers/comment_controller");

/* GET home page. */
router.get("/", comment_controller.comment_list);

module.exports = router;
