import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// errors
export const POST_ERROR = "POST_ERROR"; // action pour gérer les erreurs

// Récupération des posts
export const getPosts = (num) => async (dispatch) => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/post/`
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

// add post
export const addPost = (data) => async (dispatch) => {
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/post/`,
            data,
            { withCredentials: true } // ⚠️ si ton backend utilise auth/session
        );

        // dispatch vers le reducer avec la réponse
        dispatch({
            type: ADD_POST,
            payload: res.data, // res.data = post créé
        });

        return res.data; // utile si tu veux utiliser .then() dans le composant
    } catch (err) {
        console.error("Erreur addPost:", err.response?.data || err.message);
        dispatch({ type: POST_ERROR, payload: err.message });
    }
};

// Like d’un post
export const likePost = (postId, userId) => async (dispatch) => {
    try {
        const res = await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/post/like-post/${postId}`,
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
        console.error("Erreur addPost:", err.response?.data || err.message);

        // Envoie l’erreur dans Redux
        dispatch({ type: POST_ERROR, payload: err.message });

        // Vide l’erreur après 3 secondes
        setTimeout(() => {
            dispatch({ type: POST_ERROR, payload: "" });
        }, 3000);
    }
};

// Unlike d’un post
export const unlikePost = (postId, userId) => async (dispatch) => {
    try {
        const res = await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/post/unlike-post/${postId}`,
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
// mettre à jour post
export const updatePost = (postId, message) => {
    return async (dispatch) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/post/${postId}`,
                {
                    message,
                }
            );

            dispatch({
                type: UPDATE_POST,
                payload: { message, postId },
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du post :", error);
            dispatch({ type: POST_ERROR, payload: error.message });
        }
    };
};
//  supprimé un post
export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/post/${postId}`
            );

            dispatch({
                type: DELETE_POST,
                payload: { postId },
            });
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
            dispatch({ type: POST_ERROR, payload: error.message });
        }
    };
};

// create comment

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return async (dispatch) => {
        try {
            const res = await axios.patch(
                `${
                    import.meta.env.VITE_API_URL
                }/api/post/comment-post/${postId}`,
                { commenterId, text, commenterPseudo }
            );

            dispatch({
                type: ADD_COMMENT,
                payload: { postId, comment: res.data },
            });

            return res.data; // ✅ permet le .then() côté composant
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error);
            dispatch({ type: POST_ERROR, payload: error.message });
        }
    };
};
// Modifier un commentaire
export const editComment = (postId, commentId, text) => async (dispatch) => {
    try {
        await axios.patch(
            `${
                import.meta.env.VITE_API_URL
            }/api/post/edit-comment-post/${postId}`,
            { commentId, text }
        );

        dispatch({
            type: EDIT_COMMENT,
            payload: { postId, commentId, text },
        });
    } catch (error) {
        console.error("Erreur lors de la modification du commentaire :", error);
        dispatch({ type: POST_ERROR, payload: error.message });
    }
};

// Supprimer un commentaire
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.patch(
            `${
                import.meta.env.VITE_API_URL
            }/api/post/delete-comment-post/${postId}`,
            { commentId }
        );

        dispatch({
            type: DELETE_COMMENT,
            payload: { postId, commentId },
        });
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        dispatch({ type: POST_ERROR, payload: error.message });
    }
};
