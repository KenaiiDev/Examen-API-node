import Joi from "joi";

export const authRegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  birthday: Joi.date().required(),
});

export const authLoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  birthday: Joi.date(),
});

export const authRefreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
