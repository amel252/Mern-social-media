import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./utils";
import { getTrends } from "../actions/post.actions";
import { Link, NavLink } from "react-router-dom";

export default function Trends() {
    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            // convertir l’objet de posts en tableau
            const postArr = Object.keys(posts).map((i) => posts[i]);
            // trier par nombre de likes (du + grand au + petit)
            let sortedArray = postArr.sort(
                (a, b) => b.likers.length - a.likers.length
            );
            sortedArray.length = 3; // top 3
            dispatch(getTrends(sortedArray));
        }
    }, [posts, dispatch]);

    return (
        <div className="trending-container">
            <h4>Trending</h4>

            {/* Lien vers la page Trending */}
            <NavLink to="/trending">
                <ul>
                    {trendList.length &&
                        trendList.map((post) => {
                            return (
                                <li key={post._id}>
                                    <div>
                                        {post.picture && (
                                            <img
                                                src={post.picture}
                                                alt="post-pic"
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
                                        {isEmpty(post.picture) &&
                                            isEmpty(post.video) && (
                                                <img
                                                    src={
                                                        usersData[0] &&
                                                        usersData
                                                            .map((user) => {
                                                                if (
                                                                    user._id ===
                                                                    post.posterId
                                                                ) {
                                                                    return user.picture;
                                                                } else
                                                                    return null;
                                                            })
                                                            .join("")
                                                    }
                                                    alt="profil pic"
                                                />
                                            )}
                                    </div>
                                    {/* <Link to={`/post/${post._id}`}> */}
                                    {/* <div> */}
                                    {/* Afficher image du post si elle existe */}
                                    {/* {!isEmpty(post.picture) && (
                                            <img
                                                src={`${
                                                    import.meta.env.VITE_API_URL
                                                }${post.picture}`}
                                                alt="post-pic"
                                            />
                                        )} */}

                                    {/* Afficher vidéo si elle existe */}
                                    {/* {!isEmpty(post.video) && (
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={post.video}
                                                title={post._id}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )} */}

                                    {/* Si pas d'image ni de vidéo, afficher la photo de profil */}
                                    {/* {isEmpty(post.picture) &&
                                            isEmpty(post.video) &&
                                            user?.picture && (
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_URL
                                                    }${user.picture}`}
                                                    alt="profil-pic"
                                                />
                                            )} */}
                                    {/* </div> */}
                                    {/* </Link> */}
                                    <div className="trend-content">
                                        <p>{post.message}</p>
                                        <span>Lire</span>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </NavLink>
        </div>
    );
}
