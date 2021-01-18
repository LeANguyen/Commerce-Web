const express = require("express");
// import verifyToken from "../middlewares/verifyToken";
// import Article from "../controllers/articles";
const imageController = require("../controllers/imageController");
const router = express.Router();

router.post("/image", imageController.postImage);
router.delete("/image", imageController.deleteImage);
router.get("/image/aws/", imageController.getImageS3);
router.post("/image/aws/", imageController.postImageS3);
router.delete("/image/aws/", imageController.deleteImageS3);

module.exports = router;
