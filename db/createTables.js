const db = require("./index");

const createTables = async () => {
  const createUserTable = `
  CREATE TABLE client (
      id serial,
      name varchar(255),
      email varchar(255),
      pass varchar(255),
      role varchar(255),
      PRIMARY KEY(id)
      );`;

  const createItemTable = `
  CREATE TABLE item (
      id serial,
      item_name varchar(255),
      category varchar(255),
      origin varchar(255),
      price int,
      description varchar(255),
      PRIMARY KEY(id)
      );`;

  const createCartTable = `
  CREATE TABLE cart (
      id serial,
      client_name varchar(255),
      address varchar(255),
      phone varchar(255),
      checkout_date varchar(255),
      client_id int NOT NULL,
      FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE,
      PRIMARY KEY(id)
      );`;

  const createCartItemTable = `
  CREATE TABLE cart_item (
      cart_id int NOT NULL,
      item_id int NOT NULL,
      quantity int,
      FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
      FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE
      );`;

  const createAdmin = `
  INSERT INTO client (name, email, role, pass) 
  VALUES ('admin', 'admin', 'admin', '$2b$10$2CTYqvpnVMRjK5WY1xu3NO1uI/9cUVuiOpqiTNuw7oPegKBayIQfW');
  INSERT INTO cart (client_id) VALUES (1);`;

  const queryText =
    createUserTable +
    createCartTable +
    createItemTable +
    createCartItemTable +
    createAdmin;

  try {
    const result = await db.query(queryText);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
  db.end();

  // db.query(queryText)
  //   .then(res => {
  //     console.log(res);
  //     db.end();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     db.end();
  //   });
};

module.exports = createTables;
require("make-runnable");
