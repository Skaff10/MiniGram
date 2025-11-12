import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import feedReducer from "../features/feed/feedSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
