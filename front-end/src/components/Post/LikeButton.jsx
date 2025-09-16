import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);

    useEffect(() => {
        if (uid && post.likers.includes(uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, post.likers]);

    return (
        <div className="like-container">
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

            {/* Si connecté → un seul bouton qui bascule entre like/unlike */}
            {uid && (
                <img
                    src={
                        liked
                            ? "./img/icons/heart-filled.svg"
                            : "./img/icons/heart.svg"
                    }
                    alt="like"
                    onClick={() => setLiked(!liked)}
                    style={{ cursor: "pointer" }}
                />
            )}
        </div>
    );
};

export default LikeButton;
