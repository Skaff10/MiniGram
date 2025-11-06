import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "./userAPI";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await userAPI.register(user);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    return await userAPI.login(user);
  } catch (err) {
    const msg =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(msg);
  }
});
export const logout = createAsyncThunk("user/logout", async () => {
  await userAPI.logout();
});

export const uploadDP = createAsyncThunk(
  "user/uploadDp",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userAPI.uploadDP(userData, token);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      return await userAPI.getUser(id);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.isSuccess = false),
        (state.message = "");
    },
  },
  extraReducers: (builders) => {
    
  },
});
