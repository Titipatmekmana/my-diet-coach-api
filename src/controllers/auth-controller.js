const { validateRegister } = require("../validators/auth-validators");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateRegister(req.body);
    res.json(value);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // const value =
  } catch (err) {
    next(err);
  }
};
