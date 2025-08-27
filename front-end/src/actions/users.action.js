// import axios from "axios";

// export const GET_USERS = "GET_USERS";
// // Action Redux
// export const getUsers = () => {
//     return (dispatch) => {
//         return axios
//             .get(`${import.meta.env.VITE_API_URI}/api/user`)
//             .then((res) => {
//                 dispatch({ type: GET_USERS, payload: res.data });
//             })
//             .catch((err) => console.log(err));
//     };
// };
import axios from "axios";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

// Action Redux
export const getUsers = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_START });
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URI}/api/user`
            );
            dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
        } catch (err) {
            console.error(err);
            dispatch({ type: GET_USERS_FAILURE, payload: err.message });
        }
    };
};
