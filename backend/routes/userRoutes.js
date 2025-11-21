const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { protect } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  uploadDP,
  getUser,
  searchUsers,
} = require("../controller/userController");

router.get("/search", protect, searchUsers);
router.get("/getuser/:id", protect, getUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/upload", protect, upload.single("image"), uploadDP);

module.exports = router;
