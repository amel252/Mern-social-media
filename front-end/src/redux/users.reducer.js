import {
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS,
    GET_USERS_START,
} from "../actions/users.action";

const initialState = {};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_START:
            return { ...state, loading: true, error: null };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };
        case GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
