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
    const [errors, setErrors] = useState({
        pseudo: "",
        email: "",
        password: "",
        passwordConfirm: "",
        terms: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({
            pseudo: "",
            email: "",
            password: "",
            passwordConfirm: "",
            terms: "",
        });

        let hasError = false;
        const newErrors = {};

        if (password !== controlPassword) {
            newErrors.passwordConfirm =
                "Les mots de passe ne correspondent pas";
            hasError = true;
        }

        if (!document.getElementById("terms").checked) {
            newErrors.terms = "Veuillez valider les conditions générales";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/register`,
                { pseudo, email, password },
                { withCredentials: true }
            );

            if (res.data.errors) {
                setErrors((prev) => ({ ...prev, ...res.data.errors }));
            } else {
                setFormSubmit(true);
                setTimeout(() => navigate("/profil"), 2000);
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            if (error.response?.data?.message) {
                setErrors((prev) => ({
                    ...prev,
                    email: error.response.data.message,
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
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
                    <input
                        type="text"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        required
                    />
                    {errors.pseudo && (
                        <div className="error">{errors.pseudo}</div>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && (
                        <div className="error">{errors.email}</div>
                    )}

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && (
                        <div className="error">{errors.password}</div>
                    )}

                    <label htmlFor="password-conf">
                        Confirmer mot de passe
                    </label>
                    <input
                        type="password"
                        id="password-conf"
                        value={controlPassword}
                        onChange={(e) => setControlPassword(e.target.value)}
                        required
                    />
                    {errors.passwordConfirm && (
                        <div className="error">{errors.passwordConfirm}</div>
                    )}

                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        J'accepte les{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            conditions générales
                        </a>
                    </label>
                    {errors.terms && (
                        <div className="error">{errors.terms}</div>
                    )}

                    <input
                        type="submit"
                        value={
                            loading ? "Inscription..." : "Valider inscription"
                        }
                        disabled={loading}
                    />
                </form>
            )}
        </div>
    );
};

export default SignUpForm;
