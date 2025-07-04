const mongoose = require("mongoose");
const UserModel = require("../models/user.model");

const postSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            requirede: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        likers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamp: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Post", postSchema);
