const mongoose = require("mongoose");
// on va appellé cette function qui va controller le mail
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6,
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png",
        },
        bio: {
            type: String,
            max: 1024,
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String],
        },
        likes: {
            type: [String],
        },
    },
    { timestamps: true }
);
// play function before save , hasher mon Mdp
userSchema.pre("save", async function (next) {
    // Cela permet de hasher le mot de passe uniquement s’il a été modifié.
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//quand on veux se connecter on doit désalir notre password
userSchema.statics.login = async function (email, password) {
    // cherche dans la base de données un utilisateur dont le champ email correspond à celui fourni.// Si un utilisateur est trouvé, il est stocké dans la variable user.
    const user = await this.findOne({ email });
    // Si l’utilisateur existe (non nul), on continue pour vérifier le mot de passe.
    if (user) {
        // compare va comparer le mail dans BD haché stocké  et le password fourni
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            // Si la comparaison est réussie (le mot de passe est correct), on retourne l’objet user.
            return user;
        }
        // Sinon, on renvoie une erreur personnalisée
        throw Error("password incorrecte ");
    }
    // Si aucun utilisateur n'est trouvé avec l’email donné, une erreur personnalisée est renvoyée : "email incorrect".
    throw Error("email incorreste");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
