const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Upload User Profile Picture
const uploadDP = asyncHandler(async (req, res) => {
  const imageUrl = req.file.path;
  const publicId = req.file.filename;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  user.profilePic = imageUrl;
  await user.save();

  res.status(200).json({
    message: "Image uploaded and saved to user profile successfully!",
    profilePic: user.profilePic,
    publicId,
  });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, user_name, email, password, confirmpassword } = req.body;

  if (!name || !user_name || !email || !password || !confirmpassword) {
    res.status(400);
    throw new Error("Please Provide credentials");
  }

  const emailExist = await User.findOne({ email });

  const userNameExist = await User.findOne({ user_name });

  if (emailExist || userNameExist) {
    res.status(400);
    throw new Error("User Already Exists!!");
  }

  if (password !== confirmpassword) {
    res.status(400);
    throw new Error("Password Doesn't Match!!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  //Create User Documents npm
  const user = await User.create({
    name,
    user_name,
    email,
    password: hashedPass,
  });

  //If user created successfull
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.user_name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

//Login User

const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    res.status(400);
    throw new Error("Please provide email/username and password");
  }

  const user = await User.findOne({
    $or: [{ email: identifier }, { user_name: identifier }],
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      username: user.user_name,
      email: user.email,
      token: generateToken(user._id),
    });

    return;
  }

  res.status(400);
  throw new Error("Invalid Credentials");
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  uploadDP,
  getUser,
};
