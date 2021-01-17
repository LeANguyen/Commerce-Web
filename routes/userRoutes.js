const express = require("express");
// import verifyToken from "../middlewares/verifyToken";
// import Article from "../controllers/articles";
const userController = require("../controllers/userController");
const router = express.Router();

// router.get("/feeds", verifyToken, Article.getArticles);
// router.post("/articles", verifyToken, Article.createArticle);
// router.patch("/articles/:id", verifyToken, Article.updateArticle);
// router.delete("/articles/:id", verifyToken, Article.deleteArticle);
// router.post("/articles/:id/comments", verifyToken, Article.addComment);
// router.get("/articles/:id", verifyToken, Article.getArticle);

// item
router.post("/signin", userController.getClientByEmailAndPass);
router.post("/signup", userController.createClient);
router.get("/client/email/:email", userController.getClientByEmail); // to check unused email

module.exports = router;
