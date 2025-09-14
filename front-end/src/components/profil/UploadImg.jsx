import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user); // utilisateur connecté

    if (!currentUser) return <p>Chargement...</p>;

    const handlePicture = (e) => {
        e.preventDefault();
        if (!file) return alert("Veuillez sélectionner un fichier !");

        const data = new FormData();
        data.append("name", currentUser.pseudo);
        data.append("userId", currentUser._id);
        data.append("file", file);

        dispatch(uploadPicture(data, currentUser._id));
        setFile(null); // Réinitialiser le champ fichier
    };

    return (
        <form onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;
