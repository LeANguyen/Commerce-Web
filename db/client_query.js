const bcrypt = require('bcrypt');
const saltRounds = 10;

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
// Client
const createClient = (request, response) => {
    const email = request.body.email
    const pass = request.body.pass
    const name = request.body.name

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
            // Store hash in your password DB.
            pool.query('INSERT INTO client (name, email, pass) VALUES ($1, $2, $3)', [name, email, hash], (error, results) => {
                if (error) {
                    throw error
                }
            })
            response.status(200).json({ "result":"ClientAdded" })
        });
    });
}

// const createClient = (request, response) => {
//     const email = request.body.email
//     const pass = request.body.pass
//     const name = request.body.name

//     pool.query('INSERT INTO client (name, email, pass) VALUES ($1, $2, $3)', [name, email, pass], (error, results) => {
//         if (error) {
//             throw error
//         }
//     })
//     response.status(200).json({ "result":"ClientAdded" })
// }

const getClientByEmail = (request, response) => {
    const email = request.params.email
    pool.query('SELECT (email, id) FROM client WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        } 
        response.status(200).json(results.rows)
    })
}

const getClientByEmailAndPass = (request, response) => {
    const email = request.body.email
    const pass = request.body.pass
    
    pool.query('SELECT * FROM client WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        } 
        // Valid username but let's see if the password is correct
        if (results.rowCount != 0) {
            bcrypt.compare(pass, results.rows[0].pass, function(err, result) {
                // result == true
                if (result == true) {
                    response.status(200).json(results.rows)
                } else {
                    response.status(200).json([])
                }
            });
        } else {
            response.status(200).json([])
        }
        
        
    })
}

// const getClientByEmailAndPass = (request, response) => {
//     const email = request.body.email
//     const pass = request.body.pass
    
//     pool.query('SELECT * FROM client WHERE email = $1 AND pass = $2', [email, pass], (error, results) => {
//         if (error) {
//             throw error
//         } 
//         response.status(200).json(results.rows)
//     })
// }

module.exports = {
    createClient,
    getClientByEmail,
    getClientByEmailAndPass,
}