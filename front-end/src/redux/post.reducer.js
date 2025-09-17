import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initialState = [];

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        // Récupère tous les posts
        case GET_POSTS:
            return action.payload;

        // Like d’un post
        case LIKE_POST:
            return state.map((post) => {
                // si like il prend l'id de la personne
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [...post.likers, action.payload.userId],
                    };
                }
                // si tu rendre la condition retourne post
                return post;
            });

        // Unlike d’un post
        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        // ca va retiré l'id de la personne qui a déja liké avant
                        ...post,
                        likers: post.likers.filter(
                            (id) => id !== action.payload.userId
                        ),
                    };
                }
                return post;
            });

        default:
            return state;
    }
}
