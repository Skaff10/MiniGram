const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

router.post("/createcomment/:id", protect, createComment); // id -> post ID
router.put("/updatecomment/:id", protect, updateComment);
router.delete("/deletecomment/:id", protect, deleteComment);

module.exports = router;
