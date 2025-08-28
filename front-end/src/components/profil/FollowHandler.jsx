import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils";
import { followUser, unfollowUser } from "../actions/user.actions";

const FollowHandler = ({ idToFollow }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

    useEffect(() => {
        setIsFollowed(
            !isEmpty(userData.following) &&
                userData.following.includes(idToFollow)
        );
    }, [userData, idToFollow]);

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnFollow}>
                    <button className="unfollow-btn">Abonné</button>
                </span>
            )}
            {!isFollowed && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    <button className="follow-btn">Suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandler;
