const router = require("express").Router();
const { user_controller } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/", user_controller.getAllUsers); // this route is for testing purpose only and will be removed in production


module.exports = router;