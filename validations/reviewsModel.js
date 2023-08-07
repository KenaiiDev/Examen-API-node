import Joi from "joi";

export const reviewCreateSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  content: Joi.string().min(3).max(500),
  game: Joi.string().required(),
  author: Joi.string().required(),
});

export const reviewUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  content: Joi.string().min(3).max(500),
});
