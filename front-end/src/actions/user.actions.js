import axios from "axios";

export const GET_USER = "GET_USER";
export const getUser = (uid) => {
    return (dispatch) => {
        return (
            axios
                // création d'action de récup utilisateur
                .get(`${import.meta.env.VITE_API_URI}/api/user/${uid}`, {
                    withCredentials: true,
                })
                // les envoyer a reducer
                .then((res) => {
                    dispatch({ type: GET_USER, payload: res.data });
                })
                .catch((err) => console.log(err))
        );
    };
};
