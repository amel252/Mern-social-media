const UserModel = require("../models/user.model");
// ObjectId => Vérifier si un identifiant (ID) est valide avant d’exécuter une requête.
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // prends moi tout sauf le mot de passe
    try {
        const users = await UserModel.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).send("Erreur serveur.");
    }
};

// chercher les infos d'un seul utilisateur à partir de son ID.
module.exports.userInfo = async (req, res) => {
    console.log(req.params);
    // Vérifie si l’ID fourni dans l’URL est un ObjectId valide de MongoDB ou pas
    if (!ObjectId.isValid(req.params.id))
        //Si l’ID n’est pas valide, on retourne une erreur 400 +msg d'erreur
        return res.status(404).send("ID invalide:" + req.params.id);
    // Utilise Mongoose pour chercher l'utilisateur dans la base de données grâce à son ID
    try {
        //// Recherche de l'utilisateur et exclusion du mot de passe
        const user = await UserModel.findById(req.params.id).select(
            "-password"
        );
        if (!user) {
            return res.status(404).send("tilisateur non trouvé");
        }
        res.send(user);
    } catch (err) {
        console.error("Erreur serveur : ", err);
        res.status(500).send(
            "Erreur lors de la récupération de l'utilisateur."
        );
    }
};
// update User :
module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send("ID invalide:" + req.params.id);
    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    // ce qu'on veux update
                    bio: req.body.bio,
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                },
            },
            //renvoie le document après la mise à jour
            { new: true }
        );
        if (!updateUser) return res.status(404).send("Utilisateur non trouvé");
        res.send(updateUser);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// delete user
module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send("ID invalide : " + req.params.id);

    try {
        // Supprime l'utilisateur par son ID
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        // Réponse réussie après suppression
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        return res.status(500).json({ message: err.message });
    }
};
