const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  getProfilePost,
  getFeedPosts,
} = require("../controller/feedController");

router.get("/profileposts/:id", protect, getProfilePost);
router.get("/profileposts", protect, getProfilePost);
router.get("/feedposts", getFeedPosts);

module.exports = router;
