const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils");
const { pipeline } = require("stream/promises");

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
    let fileName;
    if (req.file) {
        try {
            if (
                req.file.mimetype !== "image/png" &&
                req.file.mimetype !== "image/gif" &&
                req.file.mimetype !== "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max size");
        } catch (error) {
            const errors = uploadErrors(error);
            return res.status(400).json({ errors });

        }
        fileName = req.body.posterId + Date.now() + '.jpg';
        await pipeline(
            req.file.stream,
            fs.createWriteStream(`${__dirname}/../client/public/uploads/posts/${fileName}`)
        )
    }
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        picture: req.file ? "/uploads/posts/" + fileName : "",
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
module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id);
    }

    try {
        const likedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true }
        ).populate("likers", "pseudo email");

        if (!likedPost) {
            return res.status(404).json({ message: "Post non trouvé" });
        }

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }, // ajoute le post au tableau des likes de l'utilisateur
            },
            { new: true }
        );

        res.status(200).json(likedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id);
    }

    try {
        const likedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true }
        ).populate("likers", "pseudo email");

        if (!likedPost) {
            return res.status(404).json({ message: "Post non trouvé" });
        }

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }, // supprime le post au tableau des likes de l'utilisateur
            },
            { new: true }
        );

        res.status(200).json(likedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.commentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID invalide : " + req.params.id);
    }

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).send("Post non trouvé");
        }

        return res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Erreur dans commentPost :", err.message);
        return res.status(500).send("Erreur serveur");
    }
};

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "ID invalide" });
    }
    //l’id du post (dans l’URL → req.params.id) / l’id du commentaire (dans le body → req.body.commentId)
    try {
        // Récupérer le post par ID
        // const post = await PostModel.findById(req.params.id);
        // if (!post) return res.status(404).send("Post non trouvé");

        // Chercher le commentaire à modifier
        const comment = post.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );
        if (!comment) return res.status(404).send("Commentaire non trouvé");

        // Modifier le texte du commentaire
        comment.text = req.body.text;

        // Sauvegarder le post avec le commentaire modifié
        const updatedPost = await post.save();

        // Répondre avec le post mis à jour
        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: { _id: req.body.commentId },
                },
            },
            { new: true }
        );

        if (!updatedPost)
            return res.status(404).json({ message: "Post non trouvé" });

        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
