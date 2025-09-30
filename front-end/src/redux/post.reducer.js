import {
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    POST_ERROR,
    UPDATE_POST,
    DELETE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
} from "../actions/post.actions";

const initialState = {
    posts: [],
    error: null,
};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        // Récupère tous les posts
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                error: null, // réinitialise l'erreur si succès
            };

        // Like d’un post
        case LIKE_POST:
            return {
                // si like il prend l'id de la personne
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload.postId
                        ? {
                              ...post,
                              likers: [...post.likers, action.payload.userId],
                          }
                        : // si tu rendre la condition retourne post
                          post
                ),
                error: null,
            };

        // Unlike d’un post
        case UNLIKE_POST:
            return {
                // ca va retiré l'id de la personne qui a déja liké
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload.postId
                        ? {
                              ...post,
                              likers: post.likers.filter(
                                  (id) => id !== action.payload.userId
                              ),
                          }
                        : post
                ),
                error: null,
            };
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message,
                    };
                } else return post;
            });
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);

        // CRUD commentaire
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload.postId
                        ? {
                              ...post,
                              comments: [
                                  ...post.comments,
                                  action.payload.comment,
                              ],
                          }
                        : post
                ),
            };
        case EDIT_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text,
                                };
                            }
                            return comment; // <-- important, garder les autres commentaires
                        }),
                    };
                }
                return post; // <-- important, garder les autres posts
            });

        default:
            return state;
    }
}
