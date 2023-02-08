const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, ProfileUser } = require("../models");
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

exports.userProfile = async (req, res, next) => {
  try {
    const value = {
      userId: req.user.id,
      weight: req.body.weight,
      height: req.body.height,
    };
    let createProflie;

    const check = await ProfileUser.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (check) {
      createProflie = await ProfileUser.update(value, {
        where: {
          id: req.user.id,
        },
      });
    } else {
      createProflie = await ProfileUser.create(value);
    }

    console.log(req.body);

    const update = {
      user_gender: req.body.user_gender,
      user_bdate: req.body.user_bdate,
    };

    const updateProfile = await User.update(update, {
      where: {
        id: req.user.id,
      },
    });

    res.status(201).json({ createProflie, updateProfile });
  } catch (err) {
    next(err);
  }
};
