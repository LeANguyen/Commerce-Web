// process.env
var port = process.env.PORT || 3000;
var user = process.env.RDS_USERNAME || 'postgres';
var host = process.env.RDS_HOSTNAME || 'localhost';
var password = process.env.RDS_PASSWORD || 'Lifeis2great4me';
var portDB = process.env.RDS_PORT || 5432;

// pg
const Pool = require('pg').Pool;
const pool = new Pool({
    user: user,
    host: host,
    database: 'cloudDB',
    password: password,
    port: portDB,
});

// cart_item
const addItemIntoCurrentCart= (request, response) => {
    const item_id = request.params.item_id
    const client_id = request.params.client_id
    const quantity = request.body.quantity

    pool.query(`INSERT INTO cart_item (item_id, cart_id, quantity) 
                VALUES ($1, (SELECT id 
                            FROM cart
                            WHERE id = (SELECT MAX(id) 
                            FROM (SELECT * FROM cart WHERE client_id = $2) AS X)), $3)`, [item_id, client_id, quantity], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "result":"ItemAddedToCurrentCart" })
    })
}

const getAllItemByCartID = (request, response) => {
    const cart_id = request.params.cart_id

    pool.query(`SELECT cart_item.item_id, item.item_name, item.category,item.origin, item.price, cart_item.cart_id, cart_item.quantity, cart.address, cart.client_name, cart.phone, cart.checkout_date 
                FROM item INNER JOIN cart_item ON cart_item.item_id = item.id INNER JOIN cart ON cart_item.cart_id = cart.id 
                WHERE cart_id=$1`, [cart_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getItemFromCurrentCartByItemID = (request, response) => {
    const item_id = request.params.item_id
    const client_id = request.params.client_id

    pool.query(`SELECT * FROM cart_item WHERE item_id=$1 AND cart_id=(SELECT MAX(id) FROM (SELECT * FROM cart WHERE client_id = $2) AS X)`, [item_id, client_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllItemFromCurrentCart = (request, response) => {
    const client_id = request.params.client_id

    pool.query(`SELECT cart_item.item_id, item.item_name, item.category, item.origin, item.price, cart_item.cart_id, cart_item.quantity 
                FROM item INNER JOIN cart_item ON cart_item.item_id = item.id 
                WHERE cart_id=(SELECT MAX(id) FROM (SELECT * FROM cart WHERE client_id = $1) AS X)`, [client_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateItemQuantityFromCurrentCart = (request, response) => {
    const quantity = request.body.quantity
    const item_id = request.params.item_id
    const client_id = request.params.client_id

    pool.query(
        `UPDATE cart_item SET quantity = $1
        WHERE item_id = $2 AND cart_id = (SELECT MAX(id) FROM (SELECT * FROM cart WHERE client_id = $3) AS X)`,
        [quantity, item_id, client_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json({ "result":"ItemUpdatedFromCurrentCart" })
        }
    )
}

const deleteItemFromCurrentCart = (request, response) => {
    const item_id = request.params.item_id
    const client_id = request.params.client_id

    pool.query(`DELETE FROM cart_item WHERE item_id = $1 AND cart_id = (SELECT MAX(id) 
    FROM (SELECT * FROM cart WHERE client_id = $2) AS X)`, [item_id, client_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "result":"ItemDeletedFromCurrentCart" })
    })
}

module.exports = {
    addItemIntoCurrentCart,
    getAllItemByCartID,
    getItemFromCurrentCartByItemID,
    getAllItemFromCurrentCart,
    updateItemQuantityFromCurrentCart,
    deleteItemFromCurrentCart,
}