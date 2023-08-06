import Joi from "joi";

export const userCreateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  birthday: Joi.date().required(),
  password: Joi.string().min(8).required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  birthday: Joi.date(),
});
