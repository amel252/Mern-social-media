import {
    GET_USER,
    UPLOAD_PICTURE,
    UPDATE_BIO,
    FOLLOW_USER,
    UNFOLLOW_USER,
} from "../../actions/user.actions";

const initialState = {
    // Si tu sais que userData doit toujours avoir certaines clés, tu peux mettre un initialState plus complet
    _id: null,
    pseudo: "",
    bio: "",
    picture: "",
    following: [],
    followers: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        // GET_USER → fusionne le state existant avec les infos utilisateur (payload).
        case GET_USER:
            return {
                ...state,
                ...action.payload,
            };
        case UPLOAD_PICTURE:
            // UPLOAD_PICTURE → met à jour uniquement la clé picture tout en gardant les autres infos du state.
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
                following: [
                    action.payload.idToFollow,
                    ...(state.following || []),
                ],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: (state.following || []).filter(
                    (id) => id !== action.payload.idToUnFollow
                ),
            };
        default:
            return state;
    }
}
