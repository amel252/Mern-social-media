import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { isEmpty } from "../utils";
import { dateParser } from "../utils";
import FollowHandler from "../profil/FollowHandler";
import LikeButton from "./LikeButton";

export default function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.userReducer); // liste des users
    const userData = useSelector((state) => state.userRed); // user connecté ?

    useEffect(() => {
        if (usersData.length > 0) {
            setIsLoading(false);
        }
    }, [usersData]);

    // fonction utilitaire : retrouver la photo de l’auteur du post
    const getUserPicture = () => {
        const user = usersData.find((u) => u.id === post.posterId);
        return user ? user.picture : "/default.png"; // fallback image
    };

    const getUserPseudo = () => {
        const user = usersData.find((u) => u._id === post.posterId);
        return user ? user.pseudo : "Inconnu";
    };

    return (
        <>
            <div className="card-container" key={post._id}>
                {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                ) : (
                    <div className="card-left">
                        <img src={getUserPicture()} alt="poster-pic" />
                    </div>
                )}
            </div>
            <div className="card-right">
                <div className="card-header">
                    <div className="pseudo">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>{getUserPseudo()}</h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler
                                        idToFollow={post.posterId}
                                        type={"card"}
                                    />
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="card-pic"
                                className="card-pic"
                            />
                        )}
                        {post.video && (
                            <iframe
                                width="560"
                                height="315"
                                src={post.video}
                                title={post._id}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullScreen
                            ></iframe>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img
                                    src="./img/icons/message1.svg"
                                    alt="comment"
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
