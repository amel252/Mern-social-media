import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

// errors
export const USER_ERRORS = "USER_ERRORS";

export const getUser = (uid) => async (dispatch) => {
    try {
        const res = await axios.get(
            // création d'action de récup utilisateur
            `${import.meta.env.VITE_API_URL}/api/user/${uid}`,
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
            `${import.meta.env.VITE_API_URL}/api/user/upload`,
            data
        );

        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/${id}`
        );
        if (res.data.errors) {
            dispatch({ type: USER_ERRORS, payload: "" });
        } else {
            dispatch({ type: USER_ERRORS, payload: res.data.errors });
        }
        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
    } catch (err) {
        console.error(
            "Erreur uploadPicture:",
            err.response?.data || err.message
        );
    }
};

export const updateBio = (userId, bio) => async (dispatch) => {
    try {
        const res = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/user/${userId}`,
            { bio }
        );
        dispatch({ type: UPDATE_BIO, payload: bio });
    } catch (err) {
        console.error("Erreur updateBio:", err.response?.data || err.message);
    }
};
export const followUser = (followId, idToFollow) => async (dispatch) => {
    try {
        await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/user/follow/${followId}`,
            { idToFollow },
            { withCredentials: true } // si besoin des cookies
        );
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
    } catch (err) {
        console.error("Erreur followUser:", err.response?.data || err.message);
    }
};
export const unfollowUser = (followId, idToUnFollow) => async (dispatch) => {
    try {
        await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/user/unfollow/${followId}`,
            { idToUnFollow },
            { withCredentials: true } // si besoin des cookies
        );
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnFollow } });
    } catch (err) {
        console.error("Erreur followUser:", err.response?.data || err.message);
    }
};
