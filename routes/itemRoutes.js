const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.post("/item", itemController.createItem);
router.delete("/item/id/:id", itemController.deleteItem);
router.put("/item/id/:id", itemController.updateItem);

/**
 * @swagger
 * tags:
 *     name: Item
 *     description: open API to get item(s) info for visitor
 */

/**
 * @swagger
 * /items/skip/{skip}/limit/{limit}:
 *   get:
 *     description: Get items
 *     tags: [Item]
 *     parameters:
 *      - name: skip
 *        in: path
 *        required: true
 *        type: string
 *      - name: limit
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/items/skip/:skip/limit/:limit", itemController.getItems);

/**
 * @swagger
 * /items/category/{category}:
 *   get:
 *     description: Get items by category
 *     tags: [Item]
 *     parameters:
 *      - name: category
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/items/category/:category", itemController.getItemsByCategory);

/**
 * @swagger
 * /items/name/{name}:
 *   get:
 *     description: Get items by name
 *     tags: [Item]
 *     parameters:
 *      - name: name
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/items/name/:name", itemController.getItemsByName);

/**
 * @swagger
 * /item/id/{id}:
 *   get:
 *     description: Get item by id
 *     tags: [Item]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/item/id/:id", itemController.getItemById);

/**
 * @swagger
 * /latest_item:
 *   get:
 *     description: Get the latest item
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/latest_item", itemController.getLatestItem);

module.exports = router;
