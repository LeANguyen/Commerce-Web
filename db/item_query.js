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

// Item
const createItem = (request, response) => {
    const item_name = request.body.item_name
    const category = request.body.category
    const origin = request.body.origin
    const price = request.body.price
    const description = request.body.description

    pool.query('INSERT INTO item (item_name, category, origin, price , description) VALUES ($1, $2, $3, $4, $5)', [item_name, category, origin, price, description], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "result":"ItemAdded" })
    })
}

const getAllItem = (request, response) => {
    pool.query('SELECT * FROM item ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllItemByCategory = (request, response) => {
    const category = request.params.category
    pool.query('SELECT * FROM item WHERE category = $1 ORDER BY id ASC', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteItem = (request, response) => {
    const id = request.params.id

    pool.query(`DELETE FROM item WHERE id = $1`, [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "result":"ItemDeleted" })
    })
}

const getCurrentItem = (request, response) => {
    pool.query('SELECT MAX(id) FROM (SELECT * FROM item) AS X', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getItemByID = (request, response) => {
    const id = request.params.id

    pool.query('SELECT * FROM item WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllItemByName = (request, response) => {
    const name = request.params.name

    pool.query("SELECT * FROM item WHERE UPPER(item_name) LIKE UPPER('%" + name  + "%')", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateItem = (request, response) => {
    const id = request.params.id
    const item_name = request.body.item_name
    const category = request.body.category
    const origin = request.body.origin
    const price = request.body.price
    const description = request.body.description

    pool.query(`UPDATE item SET item_name = $1, category = $2, origin = $3, price = $4, description = $5 
        WHERE id = $6`, [item_name, category, origin, price, description, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "result":"ItemUpdated" })
    })
}

module.exports = {
    createItem,
    getAllItem,
    getAllItemByCategory,
    getCurrentItem,
    getItemByID,
    getAllItemByName,
    updateItem,
    deleteItem,
}