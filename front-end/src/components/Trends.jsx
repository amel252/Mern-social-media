// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { isEmpty } from "./utils";
// import { getTrends } from "../actions/post.actions";
// import { Link, NavLink } from "react-router-dom";

// export default function Trends() {
//     const posts = useSelector((state) => state.allPostsReducer);
//     const usersData = useSelector((state) => state.usersReducer);
//     const trendList = useSelector((state) => state.trendingReducer);

//     const dispatch = useDispatch();
//     // state pour stocker les posts triés
//     // const [trendList, setTrendList] = useState([]);

//     useEffect(() => {
//         if (!isEmpty(posts[0])) {
//             // convertir l’objet de posts en tableau
//             const postArr = Object.keys(posts).map((i) => posts[i]);
//             // trier par nombre de likes (du + grand au + petit)
//             let sortedArray = postArr.sort((a, b) => {
//                 return b.likers.length - a.likers.length;
//             });
//             sortedArray.length = 3;
//             dispatch(getTrends(sortedArray));
//             // on garde seulement les 5 premiers (les plus likés)
//             // setTrendList(sortedArray.slice(0, 5));
//         }
//     }, [posts, dispatch]);
//     return (
//         <div className="trending-container">
//             <h4>Trends</h4>
//             {/* Lien vers la page Trending */}
//             <NavLink to="/trending" className="view-all-link">
//                 Voir tout
//             </NavLink>
//             <ul>
//                 {trendList.length > 0 &&
//                     trendList.map((post) => {
//                         const user =
//                             usersData &&
//                             usersData.find((u) => u._id === post.posterId);
//                         return (
//                             <li key={post._id}>
//                                 <Link to={`/post/${post._id}`}>
//                                     <div>
//                                         {post.picture && (
//                                             // si y a photo sur la publication si oui on l'affiche
//                                             <img
//                                                 src={post.picture}
//                                                 alt="post-pic"
//                                             />
//                                         )}

//                                         {post.video && (
//                                             // si y a une video on l'affiche
//                                             <iframe
//                                                 width="560"
//                                                 height="315"
//                                                 src={post.video}
//                                                 title={post._id}
//                                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                                 allowFullScreen
//                                             ></iframe>
//                                         )}
//                                         {/* si y a pas ni image ni video affiche photo de profil  */}

//                                         {isEmpty(post.picture) &&
//                                             isEmpty(post.video) && (
//                                                 <img
//                                                     src={
//                                                         usersData[0] &&
//                                                         usersData
//                                                             .map((user) => {
//                                                                 if (
//                                                                     user._id ===
//                                                                     post.posterId
//                                                                 ) {
//                                                                     return user.picture;
//                                                                 } else
//                                                                     return null;
//                                                             })
//                                                             .join("")
//                                                     }
//                                                     alt="profil-pic"
//                                                 />
//                                             )}
//                                     </div>
//                                 </Link>
//                             </li>
//                         );
//                     })}
//             </ul>
//         </div>
//     );
// }
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
            <h4>Trends</h4>

            {/* Lien vers la page Trending */}
            <NavLink to="/trending" className="view-all-link">
                Voir tout
            </NavLink>

            <ul>
                {trendList.length > 0 &&
                    trendList.map((post) => {
                        // Vérifier que usersData est un tableau avant d'utiliser find
                        const user =
                            Array.isArray(usersData) && usersData.length > 0
                                ? usersData.find((u) => u._id === post.posterId)
                                : null;

                        return (
                            <li key={post._id}>
                                <Link to={`/post/${post._id}`}>
                                    <div>
                                        {/* Afficher image du post si elle existe */}
                                        {!isEmpty(post.picture) && (
                                            <img
                                                src={`${
                                                    import.meta.env.VITE_API_URL
                                                }${post.picture}`}
                                                alt="post-pic"
                                            />
                                        )}

                                        {/* Afficher vidéo si elle existe */}
                                        {!isEmpty(post.video) && (
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={post.video}
                                                title={post._id}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}

                                        {/* Si pas d'image ni de vidéo, afficher la photo de profil */}
                                        {isEmpty(post.picture) &&
                                            isEmpty(post.video) &&
                                            user?.picture && (
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_URL
                                                    }${user.picture}`}
                                                    alt="profil-pic"
                                                />
                                            )}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
