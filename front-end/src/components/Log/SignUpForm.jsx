import axios from "axios";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Formulaire soumis");

        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error");

        // Réinitialiser les erreurs
        pseudoError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "";
        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        // Validation côté client
        if (password !== controlPassword) {
            passwordConfirmError.innerHTML =
                "Les mots de passe ne correspondent pas";
            return;
        }

        if (!terms.checked) {
            termsError.innerHTML = "Veuillez valider les conditions générales";
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URI}/api/user/register`,
                { pseudo, email, password },
                { withCredentials: true }
            );

            if (res.data.errors) {
                pseudoError.innerHTML = res.data.errors.pseudo || "";
                emailError.innerHTML = res.data.errors.email || "";
                passwordError.innerHTML = res.data.errors.password || "";
            } else {
                // Redirection ou message de succès
                setFormSubmit(true);
                // rediriger aprés 2 sec
                setTimeout(() => navigate("/profil"), 2000);
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        }
    };

    return (
        <div>
            <>
                {formSubmit ? (
                    <>
                        <SignInForm />
                        <h4 className="success">
                            ✅ Enregistrement réussi, veuillez vous connecter.
                        </h4>
                    </>
                ) : (
                    <form onSubmit={handleRegister} id="sign-up-form">
                        <label htmlFor="pseudo">Pseudo</label>
                        <br />
                        <input
                            type="text"
                            id="pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                        <div className="pseudo error"></div>
                        <br />

                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="email error"></div>
                        <br />

                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="password error"></div>
                        <br />

                        <label htmlFor="password-conf">
                            Confirmer mot de passe
                        </label>
                        <br />
                        <input
                            type="password"
                            id="password-conf"
                            value={controlPassword}
                            onChange={(e) => setControlPassword(e.target.value)}
                        />
                        <div className="password-confirm error"></div>
                        <br />

                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            J'accepte les{" "}
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                conditions générales
                            </a>
                        </label>
                        <div className="terms error"></div>
                        <br />

                        <input type="submit" value="Valider inscription" />
                    </form>
                )}
            </>
        </div>
    );
};

export default SignUpForm;
