import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./utils";
import Card from "../components/Post/Card";

export default function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getPosts());
    }, [loadPost, dispatch]);
    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts) &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />;
                    })}
            </ul>
        </div>
    );
}
