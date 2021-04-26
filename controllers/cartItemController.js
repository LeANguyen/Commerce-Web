const db = require("../db");

// cart_item
const addItemIntoCurrentCart = async (request, response, next) => {
  const item_id = request.params.item_id;
  const client_id = request.params.client_id;
  const quantity = request.body.quantity;
  const queryText = `
  INSERT INTO cart_item (item_id, cart_id, quantity) 
  VALUES ($1, (
    SELECT id 
    FROM cart 
    WHERE client_id=$2 ORDER BY id DESC LIMIT 1), $3)`;

  try {
    await db.query(queryText, [item_id, client_id, quantity]);
    response.status(200).json({ result: "ItemAddedToCurrentCart" });
  } catch (error) {
    console.log("addItemIntoCurrentCart error");
    console.log(error.message);
    next(error);
  }
};

const getAllItemByCartId = async (request, response, next) => {
  const cart_id = request.params.cart_id;
  const queryText = `
  SELECT cart_item.item_id, item.item_name, item.category, item.origin, item.price, cart_item.cart_id, cart_item.quantity, cart.address, cart.client_name, cart.phone, cart.checkout_date 
  FROM item 
  INNER JOIN cart_item ON cart_item.item_id = item.id 
  INNER JOIN cart ON cart_item.cart_id = cart.id 
  WHERE cart_id=$1`;

  try {
    const result = await db.query(queryText, [cart_id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemsByCartId error");
    console.log(error.message);
    next(error);
  }
};

const getItemFromCurrentCartByItemId = async (request, response, next) => {
  const item_id = request.params.item_id;
  const client_id = request.params.client_id;

  const queryText = `
  SELECT * 
  FROM cart_item 
  WHERE item_id = $1 AND cart_id=(
    SELECT id 
    FROM cart 
    WHERE client_id=$2 ORDER BY id DESC LIMIT 1)`;

  try {
    const result = await db.query(queryText, [item_id, client_id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemFromCurrentCartByItemId error");
    console.log(error.message);
    next(error);
  }
};

const getAllItemFromCurrentCart = async (request, response, next) => {
  const client_id = request.params.client_id;
  const queryText = `
  SELECT cart_item.item_id, item.item_name, item.category, item.origin, item.price, cart_item.cart_id, cart_item.quantity 
  FROM item 
  INNER JOIN cart_item ON cart_item.item_id = item.id 
  WHERE cart_id=(
    SELECT id 
    FROM cart 
    WHERE client_id=$1 ORDER BY id DESC LIMIT 1)`;

  try {
    const result = await db.query(queryText, [client_id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemsFromCurrentCart error");
    console.log(error.message);
    next(error);
  }
};

const updateItemQuantityFromCurrentCart = async (request, response, next) => {
  const quantity = request.body.quantity;
  const item_id = request.params.item_id;
  const client_id = request.params.client_id;
  const queryText = `
  UPDATE cart_item 
  SET quantity = $1
  WHERE item_id = $2 AND cart_id = (
    SELECT id 
    FROM cart 
    WHERE client_id=$3 ORDER BY id DESC LIMIT 1)`;

  try {
    const result = await db.query(queryText, [quantity, item_id, client_id]);
    response.status(200).json({ result: "ItemUpdatedFromCurrentCart" });
  } catch (error) {
    console.log("updateItemQuantityFromCurrentCart error");
    console.log(error.message);
    next(error);
  }

  // db.query(queryText, [quantity, item_id, client_id], (error, results) => {
  //   if (error) {
  //     return console.log(error.message);
  //   }
  //   response.status(200).json({ result: "ItemUpdatedFromCurrentCart" });
  // });
};

const deleteItemFromCurrentCart = async (request, response, next) => {
  const item_id = request.params.item_id;
  const client_id = request.params.client_id;
  const queryText = `
  DELETE 
  FROM cart_item 
  WHERE item_id = $1 AND cart_id = (
    SELECT id 
    FROM cart 
    WHERE client_id=$2 ORDER BY id DESC LIMIT 1)`;

  try {
    const result = await db.query(queryText, [item_id, client_id]);
    response.status(200).json({ result: "ItemDeletedFromCurrentCart" });
  } catch (error) {
    console.log("deleteItemFromCurrentCart error");
    console.log(error.message);
    next(error);
  }

  // db.query(queryText, [item_id, client_id], (error, results) => {
  //   if (error) {
  //     return console.log(error.message);
  //   }
  //   response.status(200).json({ result: "ItemDeletedFromCurrentCart" });
  // });
};

module.exports = {
  addItemIntoCurrentCart,
  getAllItemByCartId,
  getItemFromCurrentCartByItemId,
  getAllItemFromCurrentCart,
  updateItemQuantityFromCurrentCart,
  deleteItemFromCurrentCart
};
