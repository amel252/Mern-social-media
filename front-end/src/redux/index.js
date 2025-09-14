import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userReducer";
import usersReducer from "./users.reducer";
import postReducer from "../redux/post.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    posts: postReducer,
});

export default rootReducer;
