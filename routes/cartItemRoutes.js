const express = require("express");
// import verifyToken from "../middlewares/verifyToken";
// import Article from "../controllers/articles";
const cartItemController = require("../controllers/cartItemController");
const router = express.Router();

// router.get("/feeds", verifyToken, Article.getArticles);
// router.post("/articles", verifyToken, Article.createArticle);
// router.patch("/articles/:id", verifyToken, Article.updateArticle);
// router.delete("/articles/:id", verifyToken, Article.deleteArticle);
// router.post("/articles/:id/comments", verifyToken, Article.addComment);
// router.get("/articles/:id", verifyToken, Article.getArticle);

// item
router.post(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cartItemController.addItemIntoCurrentCart
);
router.get(
  "/cart_items/current_cart/client_id/:client_id",
  cartItemController.getAllItemFromCurrentCart
);
router.get(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cartItemController.getItemFromCurrentCartByItemID
);
router.put(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cartItemController.updateItemQuantityFromCurrentCart
);
router.delete(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cartItemController.deleteItemFromCurrentCart
);
router.get(
  "/cart_items/cart_id/:cart_id",
  cartItemController.getAllItemByCartID
);
module.exports = router;
