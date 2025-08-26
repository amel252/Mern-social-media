import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const getUser = (uid) => async (dispatch) => {
    try {
        const res = await axios.get(
            // création d'action de récup utilisateur
            `${import.meta.env.VITE_API_URI}/api/user/${uid}`,
            { withCredentials: true }
        );
        // les envoyer a reducer
        dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
        console.error("Erreur getUser:", err.response?.data || err.message);
    }
};
export const uploadPicture = (data, id) => async (dispatch) => {
    try {
        //on envoi a la BDD
        await axios.post(
            `${import.meta.env.VITE_API_URI}/api/user/upload`,
            data
        );
        const res = await axios.get(
            `${import.meta.env.VITE_API_URI}/api/user/${id}`
        );
        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
    } catch (err) {
        console.error(
            "Erreur uploadPicture:",
            err.response?.data || err.message
        );
    }
};
