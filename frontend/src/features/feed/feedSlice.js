import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import feedApi from "./feedAPI";

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
      });
  },
});

export const { reset } = feedSlice.actions;
export default feedSlice.reducer;
