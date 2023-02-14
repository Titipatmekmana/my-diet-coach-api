const express = require("express");

const foodController = require("../controllers/food-controller");
const authernticate = require("../middlewares/authernticate");

const router = express.Router();

router.get("/", foodController.food);
router.post("/foodDate", authernticate, foodController.foodDate);

router.get(
  "/getUserFoodTotals",
  authernticate,
  foodController.getUserFoodTotals
);

router.delete("/:id", authernticate, foodController.deleFoodList);
module.exports = router;
