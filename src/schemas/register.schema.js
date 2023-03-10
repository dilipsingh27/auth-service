const joi = require("joi");

const registerSchema = joi.object({
  password: joi.string().min(6).max(25).required(),
  email: joi.string().email().required(),
});

module.exports = registerSchema;
