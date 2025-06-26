const UserModel = require("../models/user.model");
// ObjectId => Vérifier si un identifiant (ID) est valide avant d’exécuter une requête.
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // prends moi tout sauf le mot de passe
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
};
