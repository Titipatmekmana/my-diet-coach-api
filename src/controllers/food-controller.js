const { Op } = require("sequelize");
const { Food } = require("../models");

exports.food = async (req, res, next) => {
  const name = req.query.name;
  try {
    console.log(req.query.name);
    const foodlist = await Food.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    // const value = {
    //   foodId: req.food.id,
    //   name: req.body.name,
    //   group: req.body.group,
    //   calories: req.body.calories,
    //   carbs: req.body.carbs,
    //   fat: eq.body.fat,
    //   protein: eq.body.protein,
    console.log(foodlist);
    res.status(201).json(foodlist);
  } catch (err) {}
};
