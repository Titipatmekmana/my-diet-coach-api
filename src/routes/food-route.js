const express = require("express");

const foodController = require("../controllers/food-controller");
const authernticate = require("../middlewares/authernticate");

const router = express.Router();

router.get("/", foodController.food);
router.post("/foodDate", authernticate, foodController.foodDate);

module.exports = router;
