const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");


const getProfilePost = asyncHandler(async (req, res) => {
  
  const posts = await Post.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("user", "user_name profilePic")
    .lean();

  for (let post of posts) {
  
    const comment = await Comment.find({ post: post._id })
      .sort({ createdAt: -1 })
      .populate("user", "user_name profilePic")
      .lean();


    post.comments = comment.reverse(); 
    post.likeCount = post.likes.length;
  }

  
  res.status(200).json(posts);
});

const getFeedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "user_name profilePic")
    .lean();
  for (let post of posts) {
    const comment = await Comment.find({ post: post._id })
      .sort({ createdAt: -1 })
      .populate("user", "user_name profilePic")
      .lean();
    post.comments = comment.reverse();
    post.LikeCount = post.likes.length;
  }
  res.status(200).json(posts);
});

module.exports = {
  getFeedPosts,
  getProfilePost,
};
