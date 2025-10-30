const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

// get all post for a single post to show in my profile section
const getProfilePost = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("user", "user_name profilePic");

  for (let post of posts) {
    const commment = await Comment.find({ post: post._id })
      .sort({ createdAt: -1 })
      .populate("user", "user_name profilePic")
      .lean();
    post.commments = commment.reverse();
    postLikeCount = post.likes.length;
  }

  res.status(200).json(posts);
});

// Get all posts for feed
const getFeedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "user_name profilePic");
  for (let post of posts) {
    const commment = await Comment.find({ post: post._id })
      .sort({ createdAt: -1 })
      .populate("user", "user_name profilePic")
      .lean();
    post.commments = commment.reverse();
    postLikeCount = post.likes.length;
  }
  res.status(200).json(posts);
});

module.exports = {
  getFeedPosts,
  getProfilePost,
};
