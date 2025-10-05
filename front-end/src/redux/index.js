import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import errorReducer from "./error.reducer";
import allPostReducer from "./allPostsReducer";

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
    allPostReducer,
});
