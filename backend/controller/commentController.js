const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id } = req.params; // id is the Post ID

  if (!text) {
    res.status(400); // 400 is better for missing body data
    throw new Error("Comment text is required!");
  }

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  const comment = await Comment.create({
    user: req.user._id,
    post: id,
    text: text,
  });

  // ⭐️ FIX: Add the new comment ID to the Post's comments array
  post.comments.push(comment._id);
  await post.save();

  // ⭐️ CRUCIAL: Populate the user details for the frontend
  await comment.populate("user", "user_name profilePic"); 
  
  // Send the fully populated comment object back
  res.status(201).json(comment);
});

const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment Not Found!!");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized to edit this comment!");
  }
  comment.text = req.body.text || comment.text;
  const updatedComment = await comment.save();
  res.status(200).json(updatedComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const post = await Post.findById(comment.post);

  if (!comment) {
    res.status(404);
    throw new Error("Comment Not Found!!");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (
    comment.user.toString() !== req.user.id &&
    post.user._id.toString() !== req.user.id
  ) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
