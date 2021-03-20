const express = require("express");
const router = express.Router();

// view render
router.get("/", function(req, res) {
  res.render("home");
});

router.get("/home_page", function(req, res) {
  res.render("home");
});

router.get("/item_page", function(req, res) {
  res.render("item");
});

router.get("/item_detail_page", function(req, res) {
  res.render("item_detail");
});

router.get("/about", function(req, res) {
  res.render("about");
});

router.get("/sign_page", function(req, res) {
  res.render("sign");
});

router.get("/cart_page", function(req, res) {
  res.render("cart");
});

router.get("/cart_history_page", function(req, res) {
  res.render("cart_history");
});

router.get("/cart_detail_page", function(req, res) {
  res.render("cart_detail");
});

router.get("/admin_page", function(req, res) {
  res.render("admin");
});

module.exports = router;
