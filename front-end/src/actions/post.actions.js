import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
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
