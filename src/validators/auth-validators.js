const Joi = require("joi");
const validate = require("./validate");

const reqisterSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "first name is required",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "last nemar is required",
  }),
  emailOrMobile: Joi.alternatives()
    .try(
      Joi.string().email({ tlds: false }),
      Joi.string().pattern(/^[0-9]{10}$/)
    )
    .messages({
      "alternatives.match": "must be valid email address or mobile number",
    }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must contain number or alphabet",
    "string.min": "password must have at least 6 characters",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm password did not match",
      "string.empty": "confirm password is required",
    }),
  admin: Joi.string().required(),
});

exports.validateRegister = validate(reqisterSchema);
