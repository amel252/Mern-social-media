import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
// Récupération des posts
export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${import.meta.env.VITE_API_URI}/api/post/`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
// Like d’un post
export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${import.meta.env.VITE_API_URI}/api/post/like-post/${postId}`,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
// Unlike d’un post
export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios
            .patch(
                `${
                    import.meta.env.VITE_API_URI
                }/api/post/unlike-post/${postId}`,
                {
                    id: userId,
                }
            )
            .then(() => {
                dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => {
                console.error("Erreur lors du unlike :", err);
            });
    };
};
