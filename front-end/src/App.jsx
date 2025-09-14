import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/index.jsx";
import { UidContext } from "./components/AppContext.jsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUser } from "./actions/user.actions.js";

const App = () => {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();

    // Vérifie si l'utilisateur est connecté
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URI}/api/user/current-user`,
                    { withCredentials: true }
                );

                if (res.data.uid) {
                    setUid(res.data.uid); // Stocke l'ID utilisateur
                } else {
                    setUid(null); // Pas d'utilisateur connecté
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'utilisateur :",
                    error
                );
                setUid(null); // Sécurité : réinitialise si erreur
            }
        };

        fetchUser();
    }, []);

    // Dès que uid est défini, on récupère les infos utilisateur via Redux
    useEffect(() => {
        if (uid) {
            dispatch(getUser(uid));
        }
    }, [uid, dispatch]);

    return (
        <UidContext.Provider value={uid}>
            {/* Tout ton application React */}
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
