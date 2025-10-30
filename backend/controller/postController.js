const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");





const createPost = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  if (!text && !image) {
    res.status(400);
    throw new Error("There is nothing to Post");
  }

  const post = await Post.create({
    user: req.user._id,
    text: text || "",
    image: image || null,
  });

  await post.populate("user", "user_name profilePic");
  res.status(201).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
