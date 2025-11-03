const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getpost,
} = require("../controller/postController");
const upload = require("../middlewares/multer");

router.get("/getpost/:id", getpost);
router.post("/createpost", protect, upload.single("image"), createPost);
router.put("/updatepost/:id", protect, updatePost);
router.delete("/deletepost/:id", protect, deletePost);
router.put("/like/:id", protect, likeDislikePost);
module.exports = router;
