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
// la récupération d’un seul utilisateur :
module.exports.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select(
            "-password"
        );
        if (!user)
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
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
// function follow
module.exports.follow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send("ID invalide : " + req.params.id);

    if (!ObjectId.isValid(req.body.idToFollow)) {
        return res
            .status(404)
            .send("ID à suivre invalide : " + req.body.idToFollow);
    }
    try {
        // Ajouter à la liste des personnes que l'utilisateur suit
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true }
        );

        // Ajouter à la liste des followers de la personne suivie
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true }
        );

        res.status(201).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// function unfollow
module.exports.unfollow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send("ID invalide : " + req.params.id);
    if (!ObjectId.isValid(req.body.idToUnFollow)) {
        return res
            .status(404)
            .send("ID à suivre invalide : " + req.body.idToUnFollow);
    }
    try {
        // supp à la liste des personnes que l'utilisateur suit
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true }
        );

        // supp à la liste des followers de la personne suivie
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true }
        );

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error("Erreur lors de la suppression :", err);
        return res.status(500).json({ message: err.message });
    }
};
