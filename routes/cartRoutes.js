const express = require("express");
// import verifyToken from "../middlewares/verifyToken";
// import Article from "../controllers/articles";
const cartController = require("../controllers/cartController");
const router = express.Router();

// router.get("/feeds", verifyToken, Article.getArticles);
// router.post("/articles", verifyToken, Article.createArticle);
// router.patch("/articles/:id", verifyToken, Article.updateArticle);
// router.delete("/articles/:id", verifyToken, Article.deleteArticle);
// router.post("/articles/:id/comments", verifyToken, Article.addComment);
// router.get("/articles/:id", verifyToken, Article.getArticle);

// item
router.get("/current_cart/client_id/:client_id", cartController.getCurrentCart);
router.get("/carts/client_id/:client_id", cartController.getAllCart);
router.post("/cart/client_id/:client_id", cartController.createCart);
router.put(
  "/current_cart/client_id/:client_id",
  cartController.updateCurrentCart
);

module.exports = router;
