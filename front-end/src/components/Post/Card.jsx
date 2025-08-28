import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Card() {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.userReducer);
    const userData = useSelector((state) => state.userRed);

    useEffect(() => {
        !isEmpty(usersData[0] && setIsLoading(false));
    }, [usersData]);
    return (
        <>
            <li className="card-container" key={postMessage._id}>
                {isLoading ? (
                    <li className="fas fa-spinner fa-spin"></li>
                ) : (
                    <>
                        <div className="card-left">
                            <img
                                src={
                                    !isEmpty(
                                        userData[0] &&
                                            usersData.map((user) => {
                                                if (user.id === post.posterid)
                                                    return user.picture;
                                            })
                                    )
                                }
                                alt=""
                            />
                        </div>
                    </>
                )}
            </li>
        </>
    );
}
