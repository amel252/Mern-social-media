import { GET_USER, UPLOAD_PICTURE } from "../../actions/user.actions";

const initialState = {};

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
        default:
            return state;
    }
}
