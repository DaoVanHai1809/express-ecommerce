"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

router.get("/ok", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

router.post("/shop/signup", accessController.signUp);
module.exports = router;
