// export default Logout;
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URI}/api/user/logout`, {
                withCredentials: true,
            });
            console.log("Déconnexion réussie, je redirige...");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button
            onClick={logout}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Logout"
        >
            <img src="./img/icons/logout.svg" alt="logout" />
        </button>
    );
};

export default Logout;
