import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import feedApi from "./feedAPI";
import { updatePost } from "../post/postSlice";
import { createComment, updateComment, deleteComment } from "../comment/commentSlice";

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchPosts = createAsyncThunk(
  "feed/feedposts",
  async (_, thunkAPI) => {
    try {
      return await feedApi.getFeedPost();
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const fetchProfilePosts = createAsyncThunk(
  "feed/profilePost",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await feedApi.getProfilePost(token);
    } catch (err) {
      (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const toggleLike = createAsyncThunk(
  "feed/toggleLike",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await feedApi.likePost(postId, token); // API call returns updated post
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    
    toggleLikeLocally: (state, action) => {
      const { postId, userId } = action.payload;

      state.posts = state.posts.map((post) => {
        if (post._id === postId) {
          const likedAlready = post.likes.includes(userId);
          let newLikes;
          if (likedAlready) {
       
            newLikes = post.likes.filter((id) => id !== userId);
          } else {
    
            newLikes = [...post.likes, userId];
          }
          return { ...post, likes: newLikes };
        }
        return post;
      });
    },
    deletePostFromFeed: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(fetchProfilePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfilePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchProfilePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      })
      .addCase(toggleLike.rejected, (state) => {
        state.isLoading = false;
        // Optionally handle rollback or error message
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id
            ? {
                ...post,
                ...updatedPost,
                user: post.user, // Preserve populated user
                comments: post.comments, // Preserve populated comments
                likes: post.likes, // Preserve populated likes (if not changed by update)
              }
            : post
        );
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const newComment = action.payload;
        const postId = newComment.post;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments.push(newComment);
        }
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const postId = updatedComment.post;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments = post.comments.map((c) =>
            c._id === updatedComment._id ? updatedComment : c
          );
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId, postId } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments = post.comments.filter((c) => c._id !== commentId);
        }
      });
  },
});
export const { reset, toggleLikeLocally, deletePostFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
