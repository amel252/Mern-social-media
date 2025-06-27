const UserModel = require("../models/user.model");

//
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;
    // body-parser : un middleware pour Express qui permet de lire et traiter les données envoyées dans le corps des requêtes HTTP
    if (!pseudo || !email || !password) {
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis." });
    }
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (error) {
        console.error(error); // Pour voir l'erreur dans la console serveur
        res.status(500).json({ error: error.message });
    }
};
