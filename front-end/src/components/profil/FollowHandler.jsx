import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils";
import { followUser, unfollowUser } from "../../actions/user.actions";

const FollowHandler = ({ idToFollow }) => {
    const currentUser = useSelector((state) => state.user); // utilisateur connecté
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    // Déterminer si l'utilisateur suit déjà idToFollow
    useEffect(() => {
        if (!isEmpty(currentUser?.following)) {
            setIsFollowed(currentUser.following.includes(idToFollow));
        }
    }, [currentUser, idToFollow]);

    const handleFollow = () => {
        dispatch(followUser(currentUser._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispatch(unfollowUser(currentUser._id, idToFollow));
        setIsFollowed(false);
    };

    if (!currentUser) return null; // Pas d'utilisateur connecté

    return (
        <button
            onClick={isFollowed ? handleUnFollow : handleFollow}
            className={isFollowed ? "unfollow-btn" : "follow-btn"}
        >
            {isFollowed ? "Abonné" : "Suivre"}
        </button>
    );
};

export default FollowHandler;
