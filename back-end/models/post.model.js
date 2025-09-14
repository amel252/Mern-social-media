const mongoose = require("mongoose");
const UserModel = require("../models/user.model");

const postSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true,
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
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
                default: [],
            },
        ],
        comments: [
            {
                commenterId: { type: String, required: true },
                commenterPseudo: { type: String, required: true },
                text: { type: String, required: true, maxlength: 300 },
                timestamp: { type: Number, required: true },
            },
        ],
        default: [],
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Post", postSchema);
