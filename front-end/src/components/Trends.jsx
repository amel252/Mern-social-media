import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./utils";
import { getTrends } from "../actions/post.actions";

export default function Trends() {
    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    // state pour stocker les posts triés
    // const [trendList, setTrendList] = useState([]);

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            // convertir l’objet de posts en tableau
            const postArr = Object.keys(posts).map((i) => posts[i]);
            // trier par nombre de likes (du + grand au + petit)
            let sortedArray = postArr.sort((a, b) => {
                return b.likers.length - a.likers.length;
            });
            sortedArray.length = 3;
            dispatch(getTrends(sortedArray));
            // on garde seulement les 5 premiers (les plus likés)
            // setTrendList(sortedArray.slice(0, 5));
        }
    }, [posts, dispatch]);
    return (
        <div className="trend-container">
            <h2>Trends</h2>
            {/* {!isEmpty(trendList) &&
                trendList.map((post) => (
                    <div key={post._id} className="trend-card">
                        <h4>{post.message}</h4>
                        <p>👍 {post.likers.length} likes</p>
                    </div>
                ))} */}
        </div>
    );
}
