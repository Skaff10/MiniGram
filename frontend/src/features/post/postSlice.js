// src/features/posts/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postAPI from "./postAPI";
import { act } from "react";

const initialState = {
  posts: [],
  singlePost: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// CREATE POST
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

// FETCH SINGLE POST
export const fetchPost = createAsyncThunk(
  "posts/fetchOne",
  async (id, thunkAPI) => {
    try {
      return await postAPI.getPost(id);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// DELETE POST
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

// LIKE / UNLIKE
export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postAPI.likePost(id, token);
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
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updated = action.payload;
        state.posts = state.posts.map((p) =>
          p._id === updated._id ? updated : p
        );
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
