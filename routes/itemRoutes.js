const express = require("express");
// import verifyToken from "../middlewares/verifyToken";
// import Article from "../controllers/articles";
const itemController = require("../controllers/itemController");
const router = express.Router();

// router.get("/feeds", verifyToken, Article.getArticles);
// router.post("/articles", verifyToken, Article.createArticle);
// router.patch("/articles/:id", verifyToken, Article.updateArticle);
// router.delete("/articles/:id", verifyToken, Article.deleteArticle);
// router.post("/articles/:id/comments", verifyToken, Article.addComment);
// router.get("/articles/:id", verifyToken, Article.getArticle);

// item
router.post("/item", itemController.createItem);
router.get("/items", itemController.getAllItem);
router.get("/items/start", itemController.getStartItem);
router.get("/items/more/id/:id", itemController.getMoreItem);
router.get("/items/category/:category", itemController.getAllItemByCategory);
router.get("/items/name/:name", itemController.getAllItemByName);
router.get("/current_item", itemController.getCurrentItem);
router.get("/item/id/:id", itemController.getItemByID);
router.delete("/item/id/:id", itemController.deleteItem);
router.put("/item/id/:id", itemController.updateItem);

module.exports = router;
