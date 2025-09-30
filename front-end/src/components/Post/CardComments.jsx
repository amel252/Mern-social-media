import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../utils";
import FollowHandler from "../profil/FollowHandler";

const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = () => {
        if (text.trim()) {
            // Dispatch de l'action Redux addComment
            // dispatch(addComment(post._id, userData._id, text))
            console.log("Commentaire à envoyer :", text);
            setText("");
        }
    };

    return (
        <div className="comments-container">
            {!isEmpty(post.comments) &&
                post.comments.map((comment) => {
                    const commenter = usersData.find(
                        (user) => user._id === comment.commenterId
                    );
                    const picture = commenter ? commenter.picture : "";
                    const pseudo =
                        comment.commenterPseudo ||
                        commenter?.pseudo ||
                        "Utilisateur";

                    return (
                        <div
                            className={
                                comment.commenterId === userData._id
                                    ? "comment-container client"
                                    : "comment-container"
                            }
                            key={comment._id}
                        >
                            <div className="left-part">
                                <img src={picture} alt={`${pseudo}-pic`} />
                            </div>
                            <div className="right-part">
                                <div className="comment-header">
                                    <div className="pseudo">
                                        <h3>
                                            {pseudo}
                                            {comment.commenterId !==
                                                userData._id && (
                                                <FollowHandler
                                                    idToFollow={
                                                        comment.commenterId
                                                    }
                                                    type="card"
                                                />
                                            )}
                                        </h3>
                                    </div>
                                    <span>
                                        {timestampParser(comment.timestamp)}
                                    </span>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    );
                })}

            {userData._id && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleComment();
                    }}
                    className="comment-form"
                >
                    <input
                        type="text"
                        placeholder="Laisser un commentaire..."
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <br />
                    <button type="submit" disabled={!text.trim()}>
                        Envoyer
                    </button>
                </form>
            )}
        </div>
    );
};

export default CardComments;
