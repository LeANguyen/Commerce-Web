// process.env
// aama4nh59pwany.c3oety19zjax.us-west-2.rds.amazonaws.com
// 11223344
var port = process.env.PORT || 3000;
var user = process.env.RDS_USERNAME || "postgres";
var host = process.env.RDS_HOSTNAME || "localhost";
var password = process.env.RDS_PASSWORD || "Lifeis2great4me";
var portDB = process.env.RDS_PORT || 5432;
// aama4nh59pwany.c3oety19zjax.us-west-2.rds.amazonaws.com

// pg
// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: user,
//   host: host,
//   database: "cloudDB",
//   password: password,
//   port: portDB
// });

const { Client } = require("pg");

const pool = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://zakavourbbpvhk:6e9a933dc4614e8d99ca6eaf1a262c8af0f7230978e5e17d34182f0afcff550b@ec2-34-195-169-25.compute-1.amazonaws.com:5432/d1fm0d7qcjkujj",
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE client (
            id serial,
            name varchar(255),
            email varchar(255),
            pass varchar(255),
            PRIMARY KEY(id)
        );
        
        CREATE TABLE item (
            id serial,
            item_name varchar(255),
            category varchar(255),
            origin varchar(255),
            price varchar(255),
            description varchar(255),
            PRIMARY KEY(id)
        );
        
        CREATE TABLE cart (
            id serial,
            client_name varchar(255),
            address varchar(255),
            phone varchar(255),
            checkout_date varchar(255),
            client_id int NOT NULL,
            FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE,
            PRIMARY KEY(id)
        );
        
        CREATE TABLE cart_item (
            cart_id int NOT NULL,
            item_id int NOT NULL,
            quantity int,
            FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
            FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE
        );
        
        INSERT INTO client (name, email, pass) VALUES ('admin', 'admin', '$2b$10$2CTYqvpnVMRjK5WY1xu3NO1uI/9cUVuiOpqiTNuw7oPegKBayIQfW');
        INSERT INTO cart (client_id) VALUES (1);`;
  // $2b$10$2CTYqvpnVMRjK5WY1xu3NO1uI/9cUVuiOpqiTNuw7oPegKBayIQfW
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = `DROP TABLE IF EXISTS cart_item; 
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS item;
        DROP TABLE IF EXISTS client;`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  pool
};

require("make-runnable");
