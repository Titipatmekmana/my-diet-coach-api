const express = require("express");

const calorieCalculator = require("../controllers/cal-Calories-controller");
const authernticate = require("../middlewares/authernticate");

const router = express.Router();

router.get("/", authernticate, calorieCalculator.calBmr);

module.exports = router;
