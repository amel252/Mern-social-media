// utilisée pour interpréter et reformater les erreurs provenant de la création d’un compte utilisateur (signup)
// les erreurs d'inscription
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (err.message.includes("pseudo"))
        errors.pseudo = "Pseudo incorrect ou déjà pris";

    if (err.message.includes("email")) errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password =
            "Le mot de passe doit faire plus de 6 caractères minimum";

    // MongoDB utilise le code d’erreur 11000 lorsqu’un champ unique (comme email ou pseudo) existe déjà dans la base de données.
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà pris";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";

    return errors;
};
// les erreurs de connexion
module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.message.includes("email")) errors.email = "Email Inconnu";
    if (err.message.includes("password"))
        errors.password = "le mot de passe ne correspond pas  ";
    return errors;
};
