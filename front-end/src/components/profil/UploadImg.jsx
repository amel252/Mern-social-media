import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        if (!file) return alert("Veuillez sélectionner un fichier !");
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(uploadPicture(data, userData._id));
    };
    return (
        <form onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'images</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;
