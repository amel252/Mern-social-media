import { POST_ERROR } from "../actions/post.actions";

const initialState = {
    postErrors: [],
};
export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case POST_ERROR:
            return {
                postErrors: action.payload,
            };
        default:
            return state;
    }
}
