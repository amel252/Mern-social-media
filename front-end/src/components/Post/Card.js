import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { isEmpty } from "../utils";
import { dateParser } from "../utils";
import FollowHandler from "../profil/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";

export default function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const usersData = useSelector((state) => state.usersReducer); // liste des users
    const userData = useSelector((state) => state.userReducer); // user connecté ?
    const dispatch = useDispatch();
    const updateItem = () => {
        if (textUpdate && textUpdate !== post.message) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        if (usersData.length > 0) {
            setIsLoading(false);
        }
    }, [usersData]);

    // fonction utilitaire : retrouver la photo de l’auteur du post
    const getUserPicture = () => {
        const user = usersData.find((u) => u._id === post.posterId);
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
                    <>
                        <div className="card-left">
                            <img src={getUserPicture()} alt="poster-pic" />
                        </div>

                        <div className="card-right">
                            <div className="card-header">
                                <h3>{getUserPseudo()}</h3>
                                {post.posterId !== userData?._id && (
                                    <FollowHandler
                                        idToFollow={post.posterId}
                                        type="card"
                                    />
                                )}
                                <span>{dateParser(post.createdAt)}</span>
                            </div>
                            {/*  */}
                            {!isUpdated ? (
                                <p>{post.message}</p>
                            ) : (
                                <div className="update-post">
                                    <textarea
                                        value={post.message}
                                        onChange={(e) =>
                                            setTextUpdate(e.target.value)
                                        }
                                    />
                                    <div className="button-container">
                                        <button
                                            className="btn"
                                            onClick={updateItem}
                                        >
                                            Valider modification
                                        </button>
                                        {/* button annulation modif  */}
                                        <button
                                            className="btn cancel"
                                            onClick={() => setIsUpdated(false)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            )}

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
                                    allowFullScreen
                                ></iframe>
                            )}
                            {/* si la personne qui a crée le message et qui surfe  elle aura le button pour modifier */}

                            {userData?._id === post.posterId && (
                                <div className="button-container">
                                    <div
                                        onClick={() => setIsUpdated(!isUpdated)}
                                    >
                                        <img
                                            src="./img/icons/edit.svg"
                                            alt="edit"
                                        />
                                    </div>
                                    <DeleteCard id={post._id} />
                                </div>
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
                    </>
                )}
            </div>
        </>
    );
}
