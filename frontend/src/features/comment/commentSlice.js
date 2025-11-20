import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentAPI from "./commentAPI";

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "comment/create",
  // payload arg will be the comment data: { postId, text, ... }
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      console.log(token);
      // call API with (data, token)
      return await commentAPI.createComment(data, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/update",
  // expect arg like { id, data }
  async ({ id, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await commentAPI.updateComment(id, data, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await commentAPI.deleteComment(id, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
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
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const i = state.comments.findIndex(
          (cmnt) => cmnt._id == action.payload.id
        );
        if (i != -1) {
          state.comments[i] = action.payload;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.comments = state.comments.filter(
          (cmnt) => cmnt._id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
