const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// function pour lire les posts
module.exports.readAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 });
        if (!posts) return res.status(404).json({ message: "Post non trouvé" });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// function pour lire un post en particulier
module.exports.readOnePost = async (req, res) => {
    const postId = req.params.id;

    // Vérifie si l'ID est valide
    if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// function pour créer les posts
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};
// faire la function pour mettre a jour le post
module.exports.updatePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id);
    }
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: { message: req.body.message } },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).send("Aucun post trouvé avec cet ID.");
        }

        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).json({
            message: "Erreur lors de la mise à jour",
            error: err.message,
        });
    }
};
// function pour delete post
module.exports.deletePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id);
    }
    try {
        const deletedPost = await PostModel.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).send("Aucun post trouvé avec cet ID.");
        }

        return res
            .status(200)
            .json({ message: "Post supprimé avec succès", deletedPost });
    } catch (err) {
        console.log("Delete error:", err);
        return res.status(500).send("Erreur serveur lors de la suppression");
    }
};
