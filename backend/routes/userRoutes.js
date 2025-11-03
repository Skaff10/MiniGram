const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { protect } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  uploadDP,
  getUser,
  verifyOtp,
} = require("../controller/userController");

router.get("/getuser/:id", getUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verifyotp", verifyOtp);
router.post("/upload", protect, upload.single("image"), uploadDP);

module.exports = router;
