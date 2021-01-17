require("dotenv").config();

// API
const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

// AWS
const fs = require("fs");
const AWS = require("aws-sdk");

// CORS
var cors = require("cors");

const s3 = new AWS.S3({
  // accessKeyId: AWS,
  // secretAccessKey: "MuNm1WyhJmlwD/meJ2XS005DP1DZHjIF+buytIva",
  // region: "us-west-2"
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-west-2"
});

const app = express();
app.use(cors());
app.options("*", cors());

const client_db = require("./db/client_query");
const cart_db = require("./db/cart_query");
const item_db = require("./db/item_query");
const cart_item_db = require("./db/cart_item_query");

// process.env
var port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(fileupload());
app.set("view engine", "ejs");

const basicAuth = require("express-basic-auth");

// view render
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/home_page", function (req, res) {
  res.render("home");
});

app.get("/item_page", function (req, res) {
  res.render("item");
});

app.get("/item_detail_page", function (req, res) {
  res.render("item_detail");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/sign_page", function (req, res) {
  res.render("sign");
});

app.get("/cart_page", function (req, res) {
  res.render("cart");
});

app.get("/cart_history_page", function (req, res) {
  res.render("cart_history");
});

app.get("/cart_detail_page", function (req, res) {
  res.render("cart_detail");
});

app.get("/admin_page", function (req, res) {
  res.render("admin");
});

app.use(
  basicAuth({
    users: { admin: "supersecret" }
  })
);

// client
app.post("/signin", client_db.getClientByEmailAndPass);
app.post("/signup", client_db.createClient);
app.get("/client/email/:email", client_db.getClientByEmail); // to check unused email

// item
app.post("/item", item_db.createItem);
app.get("/items", item_db.getAllItem);
app.get("/items/start", item_db.getStartItem);
app.get("/items/more/id/:id", item_db.getMoreItem)
app.get("/items/category/:category", item_db.getAllItemByCategory);
app.get("/items/name/:name", item_db.getAllItemByName);
app.get("/current_item", item_db.getCurrentItem);
app.get("/item/id/:id", item_db.getItemByID);
app.delete("/item/id/:id", item_db.deleteItem);
app.put("/item/id/:id", item_db.updateItem);

// cart
app.get("/current_cart/client_id/:client_id", cart_db.getCurrentCart);
app.get("/carts/client_id/:client_id", cart_db.getAllCart);
app.post("/cart/client_id/:client_id", cart_db.createCart);
app.put("/current_cart/client_id/:client_id", cart_db.updateCurrentCart);

// cart_item
app.post(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cart_item_db.addItemIntoCurrentCart
);
app.get(
  "/cart_items/current_cart/client_id/:client_id",
  cart_item_db.getAllItemFromCurrentCart
);
app.get(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cart_item_db.getItemFromCurrentCartByItemID
);
app.put(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cart_item_db.updateItemQuantityFromCurrentCart
);
app.delete(
  "/cart_item/current_cart/client_id/:client_id/item_id/:item_id",
  cart_item_db.deleteItemFromCurrentCart
);
app.get("/cart_items/cart_id/:cart_id", cart_item_db.getAllItemByCartID);

// upload_image function
app.put("/image", (req, res) => {
  const fileName = req.files.image_file.name;
  const path = __dirname + "/public/uploaded_images/" + fileName;

  req.files.image_file.mv(path, error => {
    if (error) {
      throw error;
    }
    res.status(200).json({ results: "ImageUploaded" });
  });
});

// delete_image function
app.delete("/image", (req, res) => {
  const path =
    __dirname + "/public/uploaded_images/item" + req.query.id + ".png";
  fs.unlink(path, err => {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ results: "ImageDeleted" });
  });
});

app.post("/image", (req, res) => {
  const fileName = req.files.image_file.name;
  const fileContent = req.files.image_file.data;

  // Setting up S3 upload parameters
  console.log(req.files.image_file.data);
  const params = {
    Bucket: "nguyenbucket",
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: "image/png"
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
});

app.get("/image", (req, res) => {
  const fileName = req.files.image_file.name;
  const fileContent = req.files.image_file.data;

  // Setting up S3 upload parameters
  console.log(req.files.image_file.data);
  const params = {
    Bucket: "nguyenbucket",
    Key: fileName, // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.getObject(params, (err, data) => {
    if (err) console.error(err);
    fs.writeFileSync(filePath, data.Body.toString());
    console.log(`${filePath} has been created!`);
  });
});

// const params = {
//   Bucket: process.env.BUCKET_NAME,
//   CreateBucketConfiguration: {
//     // Set your region here
//     LocationConstraint: "us-west-2"
//   }
// };

// s3.createBucket(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log("Bucket Created Successfully", data.Location);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(process.env.AWS_ACCESS_KEY);
  console.log(`App running on port ${port}.`);
});
