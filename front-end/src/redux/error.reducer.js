import { POST_ERROR, USER_ERROR } from "../actions/post.actions";

const initialState = {
    userError: [],
    postErrors: [],
};
export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case POST_ERROR:
            return {
                postErrors: action.payload,
                userError: [],
            };
        case USER_ERROR:
            return {
                postErrors: action.payload,
                postError: [],
            };
        default:
            return state;
    }
}
