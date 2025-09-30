import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = ({ id }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        // Fenêtre de confirmation
        if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
            dispatch(deletePost(id));
        }
    };
    return (
        <button
            onClick={handleDelete}
            // className="delete-btn"
            // style={{
            //     background: "transparent",
            //     border: "none",
            //     cursor: "pointer",
            // }}
        >
            <img src="./img/icons/trash.svg" alt="trash" />
        </button>
    );
};
export default DeleteCard;
