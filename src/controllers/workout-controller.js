const { Op } = require("sequelize");
const {
  Workout,
  UserWorkout,
  ProfileUser,
  sequelize,
  userId,
} = require("../models");

exports.workout = async (req, res, next) => {
  const { name } = req.query;
  try {
    const WorkoutList = await Workout.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    console.log(WorkoutList);
    res.status(200).json(WorkoutList);
  } catch (err) {
    next(err);
  }
};

exports.getWorkout = async (req, res, next) => {
  const userId = req.user.id;
  const profile = await ProfileUser.findOne({
    where: {
      userId: userId,
    },
    include: {
      model: UserWorkout,
      include: {
        model: Workout,
      },
    },
  });

  const allUserWorkout = profile.UserWorkouts.filter((e) => e.Workout);
  // const selectedWorkout = allUserWorkout.map((e) => e.Workout);
  res.status(200).json(allUserWorkout);
  // res.status(201).json({ profile });
};

exports.workoutDate = async (req, res, next) => {
  const { workoutId } = req.body;
  // console.log(req.user.dat, "sdfsdfsdfsdfsdfs");
  const userId = req.user.id;
  const profile = await ProfileUser.findOne({
    where: {
      userId: userId,
    },
  });
  const workoutResult = await UserWorkout.create({
    profileUserId: profile.id,
    workoutId,
  });
  if (!workoutResult) {
    return res.status(400).json({ message: "no workout" });
  }
  res.status(200).json(workoutResult);
};

exports.updateBurnCal = async (req, res, next) => {
  const userId = req.user.id;
  const profile = await ProfileUser.findOne({
    where: {
      userId: userId,
    },
  });

  const burn = await UserWorkout.findOne({
    where: {
      profileUserId: profile.id,
    },

    attributes: [
      "profileUserId",
      [sequelize.fn("sum", sequelize.col("calories")), "totalCalories"],
    ],
    group: "profileUserId",
    include: {
      model: Workout,
      attributes: [],
    },
  });
  res.status(200).json(burn);
};

exports.deleWorkout = async (req, res, next) => {
  const { id } = req.params;
  try {
    await UserWorkout.destroy({
      where: { id: id },
    });
    // console.log(req., "asdasdasdadadasdadasdas");
    res.status(200).json({ Message: "Del Success" });
  } catch (error) {
    next(error);
  }
};
