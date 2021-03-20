const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();

// middleware
const verifyToken = require("../middlewares/verifyToken");
const role = require("../middlewares/role");

// router.post(
//   "/item",
//   (res, req, next) => verifyToken(res, req, next, role.admin),
//   itemController.createItem
// );
// router.delete(
//   "/item/id/:id",
//   (res, req, next) => verifyToken(res, req, next, role.admin),
//   itemController.deleteItem
// );
// router.put(
//   "/item/id/:id",
//   (res, req, next) => verifyToken(res, req, next, role.admin),
//   itemController.updateItem
// );

// router.get("/items", verifyToken, itemController.getAllItem);
// router.get("/items/starting", verifyToken, itemController.getAllStartingItem);
// router.get("/items/more/id/:id", verifyToken, itemController.getMoreItem);
// router.get(
//   "/items/category/:category",
//   verifyToken,
//   itemController.getAllItemByCategory
// );
// router.get("/items/name/:name", verifyToken, itemController.getAllItemByName);
// router.get("/item/id/:id", verifyToken, itemController.getItemById);
// router.get("/current_item", verifyToken, itemController.getCurrentItem);

router.post("/item", itemController.createItem);
router.delete("/item/id/:id", itemController.deleteItem);
router.put("/item/id/:id", itemController.updateItem);

router.get("/items", itemController.getAllItem);
router.get("/items/starting", itemController.getAllStartingItem);
router.get("/items/more/id/:id", itemController.getMoreItem);
router.get("/items/category/:category", itemController.getAllItemByCategory);
router.get("/items/name/:name", itemController.getAllItemByName);
router.get("/item/id/:id", itemController.getItemById);
router.get("/current_item", itemController.getCurrentItem);
module.exports = router;
