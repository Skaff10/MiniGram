import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import feedReducer from "../features/feed/feedSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});
