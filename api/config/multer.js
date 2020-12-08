let multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // console.log("setting filename")
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === "audio/mpeg" ||
        file.mimetype === "audio/wave" ||
        file.mimetype === "audio/wav" ||
        file.mimetype === "audio/mp3" ||
        file.mimetype === "audio/mp4"
    ) {
        // console.log("Good format")
        cb(null, true);

    } else {
        // console.log("bad format")
        cb(null, false);

    }
};
exports.upload = multer({
    storage: storage,
    // dest: "./api/uploads/",
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});