import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const POST_ERROR = "POST_ERROR"; // action pour gérer les erreurs
export const UPDATE_POST = "UPDATE_POST";

// Récupération des posts
export const getPosts = (num) => async (dispatch) => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URI}/api/post/`
        );

        if (res.status === 200 && Array.isArray(res.data)) {
            const array = res.data.slice(0, num);
            dispatch({ type: GET_POSTS, payload: array });
        } else {
            dispatch({
                type: POST_ERROR,
                payload: "Erreur lors de la récupération des posts.",
            });
        }
    } catch (err) {
        console.error("Erreur getPosts:", err);
        dispatch({ type: POST_ERROR, payload: err.message });
    }
};

// Like d’un post
export const likePost = (postId, userId) => async (dispatch) => {
    try {
        const res = await axios.patch(
            `${import.meta.env.VITE_API_URI}/api/post/like-post/${postId}`,
            { id: userId }
        );

        if (res.status === 200) {
            dispatch({ type: LIKE_POST, payload: { postId, userId } });
        } else {
            dispatch({
                type: POST_ERROR,
                payload: "Impossible de liker le post.",
            });
        }
    } catch (err) {
        console.error("Erreur likePost:", err);
        dispatch({ type: POST_ERROR, payload: err.message });
    }
};

// Unlike d’un post
export const unlikePost = (postId, userId) => async (dispatch) => {
    try {
        const res = await axios.patch(
            `${import.meta.env.VITE_API_URI}/api/post/unlike-post/${postId}`,
            { id: userId }
        );

        if (res.status === 200) {
            dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        } else {
            dispatch({
                type: POST_ERROR,
                payload: "Impossible de retirer le like.",
            });
        }
    } catch (err) {
        console.error("Erreur unlikePost:", err);
        dispatch({ type: POST_ERROR, payload: err.message });
    }
};
export const updatePost = (postId, message) => {
    return async (dispatch) => {
        try {
            await axios.put(`${process.env.CLIENT_URL}/api/post/${postId}`, {
                message,
            });

            dispatch({
                type: UPDATE_POST,
                payload: { message, postId },
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du post :", error);
        }
    };
};
