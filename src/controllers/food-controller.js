const { Op } = require("sequelize");
const { where } = require("sequelize");
const sequelize = require("sequelize");
const { Food, UserFood } = require("../models");

exports.food = async (req, res, next) => {
  const name = req.query.name;
  try {
    console.log(req.query.name);
    const foodlist = await Food.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    console.log(foodlist);
    res.status(200).json(foodlist);
  } catch (err) {}
};

exports.foodDate = async (req, res, next) => {
  console.log(req.body);
  const { foodId, Name, Calories, Carbohydrate, Fat, Protein, dailyMeal } =
    req.body;

  // console.log(FoodId);
  const FoodResult = await Food.findOne({
    where: {
      id: foodId,
    },
  });

  console.log(FoodResult);
  const userId = req.user.id;

  const value = {
    foodId: foodId,
    profileUserId: userId,
    dailyMeal,
  };
  // console.log(value);
  const result = await UserFood.create(value);
  res.status(201).json(FoodResult);
};

exports.getDatliyMeal = async (req, res, next) => {
  try {
    const results = await UserFood.findAll({
      where: {
        profileUserId: req.user.id,
      },
      include: {
        model: Food,
      },
    });
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

exports.getUserFoodTotals = async (req, res, next) => {
  console.log(req.user.id);
  try {
    const results = await UserFood.findAll({
      where: {
        profileUserId: req.user.id,
      },
      attributes: [
        "profileUserId",
        [sequelize.fn("sum", sequelize.col("calories")), "totalCalories"],
      ],
      group: "profileUserId",
      include: {
        model: Food,
        attributes: [],
      },
    });
    console.log(results);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
};

exports.deleFoodList = async (req, res, next) => {
  const { id } = req.params;
  console.log("delete shit");
  try {
    const delefood = await UserFood.destroy({
      where: {
        foodId: id,
        profileUserId: req.user.id,
      },
    });

    const results = await UserFood.findAll({
      where: {
        profileUserId: req.user.id,
      },
      attributes: [
        "profileUserId",
        [sequelize.fn("sum", sequelize.col("calories")), "totalCalories"],
      ],
      group: "profileUserId",
      include: {
        model: Food,
        attributes: [],
      },
    });
    console.log(results);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
};

// exports.deleteItem = async (req, res, next) => {
//   try {
//     // console.log(req.params);
//     const { shopId, itemId } = req.params;
//     // console.log(itemId, shopId);
//     const item = await Product.findOne({ where: { id: itemId } });
//     // verifily User? in front or back?
//     await item.destroy();
//     res.status(200).json();
//   } catch (err) {
//     next(err);
//   }
// };
