const { uploadAvatar } = require("./multer");
const uploadController = require("../controllers/upload.controller");

const uploadAvatarMiddleware = (req, res, next) => {
    uploadAvatar.single("file")(req, res, function (err) {
        if (err) return uploadController.handleUploadError(err, res);
        next();
    });
};
module.exports = uploadAvatarMiddleware;
