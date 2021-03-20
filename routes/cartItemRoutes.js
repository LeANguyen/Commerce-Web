const express = require("express");
const cartItemController = require("../controllers/cartItemController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.post(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  verifyToken,
  cartItemController.addItemIntoCurrentCart
);
router.get(
  "/cart_items/current_cart/client_id/:client_id",
  verifyToken,
  cartItemController.getAllItemFromCurrentCart
);
router.get(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cartItemController.getItemFromCurrentCartByItemId
);
router.put(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  verifyToken,
  cartItemController.updateItemQuantityFromCurrentCart
);
router.delete(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  verifyToken,
  cartItemController.deleteItemFromCurrentCart
);
router.get(
  "/cart_items/cart_id/:cart_id",
  verifyToken,
  cartItemController.getAllItemByCartId
);
module.exports = router;
