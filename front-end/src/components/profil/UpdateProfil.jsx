import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";
import FollowHandler from "../profil/FollowHandler";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../utils";

function UpdateProfil() {
    const currentUser = useSelector((state) => state.user); // utilisateur connecté
    const usersData = useSelector((state) => state.users); // tous les utilisateurs
    const [bio, setBio] = useState(currentUser?.bio || "");
    const [updateForm, setUpdateForm] = useState(false);

    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const error = useSelector((state) => state.errorReducer.userError);

    const dispatch = useDispatch();

    if (!currentUser) return <p>Chargement...</p>;

    const handleUpdate = () => {
        dispatch(updateBio(currentUser._id, bio));
        setUpdateForm(false);
    };

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {currentUser.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={user.picture || "/default.png"} alt="user-pic" />
                    <UploadImg />
                    {error?.maxSize && <p>{error.maxSize}</p>}
                    {error?.format && <p>{error.format}</p>}
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {!updateForm ? (
                            <>
                                <p onClick={() => setUpdateForm(true)}>
                                    {currentUser.bio}
                                </p>
                                <button onClick={() => setUpdateForm(true)}>
                                    Modifier bio
                                </button>
                            </>
                        ) : (
                            <>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>
                                    Valider modifications
                                </button>
                            </>
                        )}
                    </div>
                    <h4>
                        Membre depuis le : {dateParser(currentUser.createdAt)}
                    </h4>
                    <h5 onClick={() => setFollowingPopup(true)}>
                        Abonnements: {currentUser.following?.length || 0}
                    </h5>
                    <h5 onClick={() => setFollowersPopup(true)}>
                        Abonnés: {currentUser.followers?.length || 0}
                    </h5>
                </div>
            </div>

            {/* Popup abonnements */}
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span
                            className="cross"
                            onClick={() => setFollowingPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            {usersData
                                ?.filter((user) =>
                                    currentUser.following?.includes(user._id)
                                )
                                .map((user) => (
                                    <li key={user._id}>
                                        <img
                                            src={
                                                currentUser.picture ||
                                                "/default.png"
                                            }
                                            alt="user-pic"
                                        />
                                        <h4>{user.pseudo}</h4>
                                        <FollowHandler
                                            idToFollow={user._id}
                                            type="suggestion"
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Popup abonnés */}
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span
                            className="cross"
                            onClick={() => setFollowersPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            {usersData
                                ?.filter((user) =>
                                    currentUser.followers?.includes(user._id)
                                )
                                .map((user) => (
                                    <li key={user._id}>
                                        <img
                                            src={user.picture}
                                            alt="user-pic"
                                        />
                                        <h4>{user.pseudo}</h4>
                                        <FollowHandler
                                            currentUser={currentUser}
                                            idToFollow={user._id}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateProfil;
