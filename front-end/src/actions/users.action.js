import axios from "axios";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
// Action simple
export const getUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_START" });
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URI}/api/user`
        );
        dispatch({ type: "GET_USERS_SUCCESS", payload: data });
    } catch (err) {
        dispatch({ type: "GET_USERS_FAILURE", payload: err.message });
    }
};
