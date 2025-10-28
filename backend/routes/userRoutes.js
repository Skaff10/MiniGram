const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { protect } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  uploadDP,
} = require("../controller/userController");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/upload", protect, upload.single("image"), uploadDP);

module.exports = router;
