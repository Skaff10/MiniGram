import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postAPI from "./postAPI";
import { createComment } from "../comment/commentSlice";

const initialState = {
  posts: [],
  singlePost: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postAPI.createPost(postData, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const fetchPost = createAsyncThunk(
  "posts/fetchOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postAPI.getPost(id, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);


export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postAPI.updatePost(id, data, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postAPI.deletePost(id, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singlePost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload.id);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        // action.payload is the new comment object
        const newComment = action.payload;
        const postId = newComment.post; // Get Post ID from the returned comment

        // Find the specific post in the state (e.g., state.posts is an array)
        const postIndex = state.posts.findIndex((p) => p._id === postId);

        if (postIndex !== -1) {
          // Append the populated comment object to the post's comments array
          state.posts[postIndex].comments.push(newComment);
        }
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
