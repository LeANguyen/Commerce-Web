require("dotenv").config();

// AWS
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-west-2"
});

const routes = require("./routes");

// API
const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");

// middlewares
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./utils/logger");
const swagger = require("./utils/swagger");

// CORS
const cors = require("cors");

// config app
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(fileupload());
app.set("view engine", "ejs");
app.use(httpLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

// view
app.use("", routes.viewRoutes);

// client
app.use("", routes.userRoutes);

// item
app.use("", routes.itemRoutes);

// cart
app.use("", routes.cartRoutes);

// cart_item
app.use("", routes.cartItemRoutes);

// image
app.use("", routes.imageRoutes);

const handleError = require("./middlewares/handleError");
app.use(handleError);

// upload_image function
// app.put("/image", (req, res) => {
//   const fileName = req.files.image_file.name;
//   const path = __dirname + "/public/uploaded_images/" + fileName;

//   req.files.image_file.mv(path, error => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json({ results: "ImageUploaded" });
//   });
// });

// // delete_image function
// app.delete("/image", (req, res) => {
//   const path =
//     __dirname + "/public/uploaded_images/item" + req.query.id + ".png";
//   fs.unlink(path, err => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     res.status(200).json({ results: "ImageDeleted" });
//   });
// });

// app.post("/image", (req, res) => {
//   const fileName = req.files.image_file.name;
//   const fileContent = req.files.image_file.data;

//   // Setting up S3 upload parameters
//   console.log(req.files.image_file.data);
//   const params = {
//     Bucket: "nguyenbucket",
//     Key: fileName, // File name you want to save as in S3
//     Body: fileContent,
//     ContentType: "image/png"
//   };

//   // Uploading files to the bucket
//   s3.upload(params, function(err, data) {
//     if (err) {
//       throw err;
//     }
//     console.log(`File uploaded successfully. ${data.Location}`);
//   });
// });

// app.get("/image", (req, res) => {
//   const fileName = req.files.image_file.name;
//   const fileContent = req.files.image_file.data;

//   // Setting up S3 upload parameters
//   console.log(req.files.image_file.data);
//   const params = {
//     Bucket: "nguyenbucket",
//     Key: fileName, // File name you want to save as in S3
//     Body: fileContent
//   };

//   // Uploading files to the bucket
//   s3.getObject(params, (err, data) => {
//     if (err) console.error(err);
//     fs.writeFileSync(filePath, data.Body.toString());
//     console.log(`${filePath} has been created!`);
//   });
// });

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
