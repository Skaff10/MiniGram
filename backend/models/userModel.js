const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name field cannot be empty"] },
    user_name: {
      type: String,
      required: [true, "userName field cannot be empty"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email field cannot be empty"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password field cannot be empty"],
    },
    profilePic: {
      type: String,
    },
    profilePicPublicId: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
