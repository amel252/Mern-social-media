import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils";
import FollowHandler from "./FollowHandler";

export default function FriendsHint() {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendHint, setFriendHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer.users);

    useEffect(() => {
        if (playOnce && !isEmpty(usersData) && !isEmpty(userData)) {
            const array = usersData
                .filter(
                    (user) =>
                        user._id !== userData._id &&
                        !userData.following.includes(user._id)
                )
                .map((user) => user._id);
            // limitation de suggestions
            array.sort(() => 0.5 - Math.random());
            if (window.innerHeight > 780) {
                array.lenght = 5;
            } else if (window.innerHeight > 720) {
                array.length = 4;
            } else if (window.innerHeight > 615) {
                array.length = 3;
            } else if (window.innerHeight > 540) {
                array.length = 1;
            } else {
                array.length = 0;
            }
            setFriendHint(array.slice(0));
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [usersData, userData, playOnce]);

    if (isLoading) return <div>Chargement...</div>;
    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <ul>
                    {friendHint.map((userId) => {
                        const user = usersData.find((u) => u._id === userId);
                        if (!user) return null;

                        return (
                            <li className="user-hint" key={user._id}>
                                {user.picture && (
                                    <img
                                        src={
                                            user.picture ||
                                            "/default-profile.png"
                                        }
                                        alt={user.pseudo}
                                    />
                                )}
                                <p>{user.pseudo}</p>
                                <FollowHandler
                                    idToFollow={user._id}
                                    type="suggestion"
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
