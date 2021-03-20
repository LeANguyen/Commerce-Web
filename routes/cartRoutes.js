const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get(
  "/current_cart/client_id/:client_id",
  verifyToken,
  cartController.getCurrentCart
);
router.get(
  "/carts/client_id/:client_id",
  verifyToken,
  cartController.getAllCart
);
router.post(
  "/cart/client_id/:client_id",
  verifyToken,
  cartController.createCart
);
router.put(
  "/current_cart/client_id/:client_id",
  verifyToken,
  cartController.updateCurrentCart
);

module.exports = router;
