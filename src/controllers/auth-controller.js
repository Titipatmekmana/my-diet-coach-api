const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }, { mobile: value.mobile || "" }],
      },
    });

    // console.log(mobile);

    if (user) {
      createError("email or mobile is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);

    const result = await User.create(value);

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: value.emailOrMobile },
          { mobile: value.emailOrMobile },
        ],
      },
    });

    if (!user) {
      createError("invalid email or mobile or password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("invalid email or mobile or password", 400);
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
