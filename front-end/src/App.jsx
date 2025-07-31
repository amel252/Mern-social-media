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
                    `${import.meta.env.VITE_API_URI}api/user/current-user`,
                    { withCredentials: true } // ✅ cette ligne
                );
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

    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
