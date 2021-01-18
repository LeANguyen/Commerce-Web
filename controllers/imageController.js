// API
const fs = require("fs");
const path = require("path");
const s3 = require("../aws/s3");

const postImage = (req, res) => {
  const fileName = req.files.image_file.name;
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "uploaded_images",
    fileName
  );
  req.files.image_file.mv(filePath, error => {
    if (error) {
      throw error;
    }
    res.status(200).json({ results: "ImageUploaded" });
  });
};

const deleteImage = (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "uploaded_images",
    "item" + req.query.id + ".png"
  );
  fs.unlink(filePath, err => {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ results: "ImageDeleted" });
  });
};

const postImageS3 = (req, res) => {
  const fileName = req.files.image_file.name;
  const fileContent = req.files.image_file.data;

  // Setting up S3 upload parameters
  console.log(req.files.image_file.data);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "image/png"
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) return console.error(err);
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const getImageS3 = () => {
  const fileName = req.files.image_file.name;
  const fileContent = req.files.image_file.data;

  // Setting up S3 upload parameters
  console.log(req.files.image_file.data);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.getObject(params, (err, data) => {
    if (err) return console.error(err);
    fs.writeFileSync(filePath, data.Body.toString());
    console.log(`${filePath} has been created!`);
  });
};

const deleteImageS3 = () => {};

module.exports = {
  postImage,
  deleteImage,
  postImageS3,
  getImageS3,
  deleteImageS3
};
