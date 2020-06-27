const multer = require("multer");
const path = require("path");

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("public", "images", "uploads", "usuarios", "avatares"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadAvatar = multer({ storage: storageAvatar });

module.exports = uploadAvatar;
