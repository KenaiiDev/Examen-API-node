import Joi from "joi";

export const genreCreateSchema = Joi.object({
  name: Joi.string().alphanum().required(),
});

export const genreUpdateSchema = Joi.object({
  name: Joi.string().alphanum(),
});
