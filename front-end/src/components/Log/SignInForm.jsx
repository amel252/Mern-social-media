// export default SignInForm;
import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = async (e) => {
        // console.log(import.meta.env.VITE_API_URI);

        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/login`,
                { email, password },
                { withCredentials: true }
            );
            // console.log(res);

            if (res.data.errors) {
                setEmailError(res.data.errors.email || "");
                setPasswordError(res.data.errors.password || "");
            } else {
                window.location = "/";
            }
        } catch (err) {
            console.error("Erreur de connexion :", err);

            // Gestion des erreurs renvoyées par le backend (message simple)
            if (err.response?.data?.message) {
                // Tu peux afficher ces messages dans un état général ou spécifique
                setEmailError(err.response.data.message);
                // Ou selon le message, tu peux adapter où afficher l'erreur
            } else if (err.response?.data?.errors) {
                setEmailError(err.response.data.errors.email || "");
                setPasswordError(err.response.data.errors.password || "");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} id="sign-up-form">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div className="email error" style={{ color: "red" }}>
                    {emailError}
                </div>
                <br />
                <label htmlFor="password">Mot de passe</label>
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="password error" style={{ color: "red" }}>
                    {passwordError}
                </div>
                <br />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    );
};

export default SignInForm;
