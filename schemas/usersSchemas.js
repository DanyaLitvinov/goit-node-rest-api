const joi = require("joi");

const registerSchema = joi.object({
  email: joi.string().email().max(50).required(),
  password: joi.string().min(6).max(18).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().max(50).required(),
  password: joi.string().min(6).max(18).required(),
});

const verifyEmailSchema = joi.object({
  email: joi.string().email().max(50).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};
