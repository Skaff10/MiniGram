const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postController");

router.post("/createpost", protect, createPost);
router.put("/updatepost/:id", protect, updatePost);
router.delete("/deletepost/:id", protect, deletePost);

module.exports = router;
