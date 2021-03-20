const express = require("express");
const imageController = require("../controllers/imageController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// router.post(
//   "/image",
//   (res, req, next) => verifyToken(res, req, next, role.admin),
//   imageController.postImage
// );
// router.delete(
//   "/image",
//   (res, req, next) => verifyToken(res, req, next, role.admin),
//   imageController.deleteImage
// );

router.post("/image", imageController.postImage);
router.delete("/image", imageController.deleteImage);

router.get("/image/aws/", verifyToken, imageController.getImageS3);
router.post("/image/aws/", verifyToken, imageController.postImageS3);
router.delete("/image/aws/", verifyToken, imageController.deleteImageS3);

module.exports = router;
