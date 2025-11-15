import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import feedReducer from "../features/feed/feedSlice";
import postReducer from "../features/post/postSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    posts: postReducer,
  },
});
