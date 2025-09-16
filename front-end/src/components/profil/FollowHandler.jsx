import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils";
import { followUser, unfollowUser } from "../../actions/user.actions";

//

const FollowHandler = ({ idToFollow, type }) => {
    const currentUser = useSelector((state) => state.user); // utilise Redux
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser?.following?.length > 0) {
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

    if (!currentUser) return null;

    const btnClass =
        type === "suggestion" && isFollowed ? "unfollow-btn" : "follow-btn";

    return (
        <button
            onClick={isFollowed ? handleUnFollow : handleFollow}
            className={btnClass}
        >
            {isFollowed ? "Abonné" : "Suivre"}
            {isFollowed && (type === "card" || type === "suggestion") && (
                <img
                    src="./img/icons/check.svg"
                    alt="check"
                    style={{ marginLeft: 6 }}
                />
            )}
        </button>
    );
};

export default FollowHandler;
