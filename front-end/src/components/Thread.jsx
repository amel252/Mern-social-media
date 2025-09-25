import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./utils";
import Card from "../components/Post/Card";

export default function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post);

    const showMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight
        ) {
            setLoadPost(true);
        }
    };

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5); // ⬅️ On augmente la limite pour charger plus
        }

        window.addEventListener("scroll", showMore);
        return () => window.removeEventListener("scroll", showMore);
    }, [dispatch, loadPost, count]);

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts) &&
                    posts.map((post) => (
                        <li key={post._id}>
                            <Card post={post} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
