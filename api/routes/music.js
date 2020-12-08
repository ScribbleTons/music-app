const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");
const upload = require("../config/multer");



router.get("/", musicController.getAllMusics);
router.post("/", upload.upload.single("music"), musicController.addNewMusic);
router.delete("/:musicId", musicController.deleteMusic);
module.exports = musicRoutes = router;