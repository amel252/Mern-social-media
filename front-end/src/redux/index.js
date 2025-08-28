import { combineReducers } from "redux";
import userReducer from "../redux/user/userReducer";
import usersReducer from "./users.reducer";
import postReducer from "../redux/post.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
});
