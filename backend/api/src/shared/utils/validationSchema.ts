import Joi = require("joi");

export const validation = {
    PORT: Joi.number().required(),
    DB_HOST: Joi.string().default('localhost').required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
  }