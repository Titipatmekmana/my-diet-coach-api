const express = require("express");

const foodController = require("../controllers/food-controller");

const router = express.Router();

router.get("/", foodController.food);

module.exports = router;
