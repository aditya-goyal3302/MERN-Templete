const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you are in the root route of the server.");
});

router.use('/users', require('./users.routes'));
router.use("/auth", require("./auth.routes"));

// router.use("/comments", require("./comments.routes"));
// router.use("/reactions", require("./reactions.routes"));
// router.use("/connections", require("./connections.routes"));
// router.use("/posts", require("./posts.routes"));
// router.use('/chats', require('./chat.routes'));

module.exports = router;
