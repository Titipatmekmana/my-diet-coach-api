const { Op } = require("sequelize");
const { ProfileUser, User } = require("../models");

exports.calBmr = async (req, res, next) => {
  const {
    dataValues: { user_gender, user_Bdate },
  } = await User.findOne({
    where: {
      id: req.user.id,
    },
  });

  const {
    dataValues: { weight, height },
  } = await ProfileUser.findOne({
    where: {
      userId: req.user.id,
    },
  });

  const bdList = user_Bdate.split("-");
  const cal = 2023 - bdList[0];
  let result;
  let p;

  if (user_gender === "MALE") {
    result = 66 + 13.7 * weight + 5 * height - 6.8 * cal;
  } else if (user_gender === "FEMALE") {
    result = 665 + 9.6 * weight + 1.8 * height - 4.7 * cal;
  }
  //   Math.floor(result);
  console.log(result);
  res.status(201).json({ result, p });
};
