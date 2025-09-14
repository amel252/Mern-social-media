import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userReducer";
import usersReducer from "./users.reducer";
import postReducer from "../redux/post.reducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        posts: postReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
