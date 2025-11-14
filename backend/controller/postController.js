const cloudinary = require("../config/cloudinary");
const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

const getpost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!");
  }
  await post.populate("user", "user_name profilePic");
  res.status(201).json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text && !req.file) {
    res.status(400);
    throw new Error("There is nothing to Post");
  }

  let imageData = null;
  if (req.file) {
    imageData = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  const post = await Post.create({
    user: req.user._id,
    text: text || "",
    image: imageData,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { posts: post._id },
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

  if (!req.user || post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  let imageData = post.image;
  if (req.file) {
    if (post.image && post.image.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
    });

    imageData = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text || post.text,
      image: imageData,
    },
    {
      new: true,
    }
  );
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
  // Delete image from Cloudinary if exists
  if (post.image && post.image.public_id) {
    await cloudinary.uploader.destroy(post.image.public_id);
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

const likeDislikePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await Post.findById(postId);
  if (!post) {
    req.status(404);
    throw new Error("Post Not Found!");
  }

  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  const updatedPost = await post.save();

  res.status(200).json({
    postId: updatedPost._id,
    likesCount: updatedPost.likes.length,
    likedByUser: !alreadyLiked,
  });
});

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getpost,
};
