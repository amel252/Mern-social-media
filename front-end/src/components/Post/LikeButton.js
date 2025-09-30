import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // fonctions pour liker / unliker
    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };

    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    // synchroniser l'état local avec les données du post
    useEffect(() => {
        if (uid && post.likers.includes(uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, post.likers]);

    return (
        <div
            className="like-container"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
            {/* Si pas connecté → afficher popup */}
            {!uid && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer un post</div>
                </Popup>
            )}

            {/* Si connecté → bouton qui bascule entre like/unlike */}
            {uid && liked && (
                <img
                    src="./img/icons/heart-filled.svg"
                    alt="unlike"
                    onClick={unlike}
                    style={{ cursor: "pointer" }}
                />
            )}
            {uid && !liked && (
                <img
                    src="./img/icons/heart.svg"
                    alt="like"
                    onClick={like}
                    style={{ cursor: "pointer" }}
                />
            )}

            {/* Compteur de likes */}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;
