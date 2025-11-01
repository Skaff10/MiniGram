const Comment = require("../models/commentModel");

const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;
  if (!text) {
    res.status(404);
    throw new Error("No Comments!!");
  }

  const comment = await Comment.create({
    user: req.user._id,
    post: postId,
    text: text,
  });

  await comment.populate("user", "user_name profilePic");
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

  //   const updatedComment = await Comment.findByIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     {
  //       new: true,
  //     }
  //   );
  comment.text = req.body.text || comment.text;
  const updatedComment = await comment.save();
  res.status(200).json(updatedComment);
});

const deleteComment = asyncHandler(async (req, res) => {
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
