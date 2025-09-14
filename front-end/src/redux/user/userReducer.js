import {
    GET_USER,
    UPLOAD_PICTURE,
    UPDATE_BIO,
    FOLLOW_USER,
    UNFOLLOW_USER,
} from "../../actions/user.actions";

const initialState = {
    _id: null,
    pseudo: "",
    email: "",
    picture: "",
    bio: "",
    following: [],
    followers: [],
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                ...action.payload,
            };
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            };
        case FOLLOW_USER:
            return {
                ...state,
                following: state.following.includes(action.payload.idToFollow)
                    ? state.following
                    : [action.payload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter(
                    (id) => id !== action.payload.idToUnFollow
                ),
            };
        default:
            return state;
    }
}
