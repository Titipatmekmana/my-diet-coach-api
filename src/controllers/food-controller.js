const { Op } = require("sequelize");
const { where } = require("sequelize");
const sequelize = require("sequelize");
const { Food, UserFood, ProfileUser } = require("../models");

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
  console.log(req, "bodyReq");
  const { foodId, Name, Calories, Carbohydrate, Fat, Protein, dailyMeal } =
    req.body;
  // console.log(FoodId);
  const FoodResult = await Food.findOne({
    where: {
      id: foodId,
    },
  });

  const userId = req.user.id;
  const profile = await ProfileUser.findOne({
    where: {
      userId: userId,
    },
  });

  console.log(FoodResult);

  const value = {
    foodId: foodId,
    profileUserId: profile.id,
    dailyMeal,
  };
  console.log(value);
  const userFoodData = await UserFood.create(value);
  res.status(201).json({ FoodResult, userFoodData });
};

exports.getDatliyMeal = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await ProfileUser.findOne({
      where: {
        userId: userId,
      },
    });
    const results = await UserFood.findAll({
      where: {
        profileUserId: profile.id,
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
    const userId = req.user.id;
    const profile = await ProfileUser.findOne({
      where: {
        userId: userId,
      },
    });
    const results = await UserFood.findAll({
      where: {
        profileUserId: profile.id,
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

exports.getUserFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const userFood = await UserFood.findOne({
      where: {
        foodId: foodId,
      },
    });
    res.status(200).json(userFood);
  } catch (error) {
    next(error);
  }
};

exports.deleFoodList = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const profile = await ProfileUser.findOne({
      where: {
        userId: userId,
      },
    });
    console.log(id, profile.id, "deleteFood");
    const fi = await UserFood.findOne({
      where: {
        foodId: id,
      },
    });
    const del = await UserFood.destroy({
      where: {
        id: id,
      },
    });

    const results = await UserFood.findAll({
      where: {
        profileUserId: profile.id,
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
