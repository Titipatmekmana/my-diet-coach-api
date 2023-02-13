const { Op } = require("sequelize");
const { Food, UserFood } = require("../models");

exports.food = async (req, res, next) => {
  const name = req.query.name;
  try {
    console.log(req.query.name);
    const foodlist = await Food.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    console.log(foodlist);
    res.status(201).json(foodlist);
  } catch (err) {}
};

exports.foodDate = async (req, res, next) => {
  // console.log(req.body);
  const { Foodid, Name, Calories, Carbohydrate, Fat, Protein } = req.body;
  console.log(Foodid);

  const FoodResult = await Food.findOne({
    where: {
      id: Foodid,
    },
  });

  // const foodData = {
  //   profileUserId: req.user.id,
  //   foodId: Foodid,
  //   // serving: req.body.serving,
  //   // date: req.body.date,
  //   // dailyMeal: req.body.dailyMeal,
  // };
  // const check = await profileUserId.findOne({
  //   where: {
  //     userId: req.user.id,
  //   },
  // });

  // createId = await UserFood.create(foodData);
  res.status(201).json(FoodResult);
  // console.log(req.body);
  // console.log(req.user);
  // res.json(555);
};
