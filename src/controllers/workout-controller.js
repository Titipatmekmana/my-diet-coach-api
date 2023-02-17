const { Op } = require("sequelize");
const { workout } = require("../models");

exports.workout = async (req, res, next) => {
  const name = req.query.name;
  try {
    const WorkoutList = await workout.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    console.log(WorkoutList);
    res.status(200).json(WorkoutList);
  } catch (err) {
    return err;
  }
};
