import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/index.jsx";
import { UidContext } from "./components/AppContext.jsx";
import { useDispatch } from "react-redux";

import axios from "axios";
import { getUser } from "./actions/user.actions.js";

const App = () => {
    console.log(import.meta.env.VITE_API_URI);
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();
    // on va vérifié si l'user est connécté
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URI}/api/user/current-user`,
                    { withCredentials: true } // ✅ cette ligne
                );
                console.log(res);

                setUid(res.data.uid);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'utilisateur :",
                    error
                );
            }
        };

        fetchUser(); // 🔁 Appelé une seule fois au chargement
    }, []);
    //  Le second useEffect déclenche le dispatch(getUser(uid)) dès que uid est défini
    useEffect(() => {
        if (uid) {
            dispatch(getUser(uid));
        }
    }, [uid, dispatch]);
    return <UidContext.Provider value={uid}></UidContext.Provider>;
};

export default App;
