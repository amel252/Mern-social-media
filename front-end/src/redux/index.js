import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import usersReducer from "./users.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
});
