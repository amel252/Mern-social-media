import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/index.jsx";
import { UidContext } from "./components/AppContext.jsx";

import axios from "axios";

const App = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URI}api/user/current`,
                    { withCredentials: true }
                );
                setUid(res.data.uid); // en supposant que `uid` soit dans la réponse
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'utilisateur :",
                    error
                );
            }
        };

        fetchUser();
        // [] c'est pour ne pas avoir une requette à l'infini
    }, []);
    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
