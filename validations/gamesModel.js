import Joi from "joi";

export const gamesCreateSchema = Joi.object({
  title: Joi.string().required(),
  developer: Joi.string().required(),
  price: Joi.number().required(),
  releaseDate: Joi.date().required(),
  genres: Joi.array().items(Joi.string()).required(),
  platforms: Joi.array().items(Joi.string()).required(),
});

export const gamesUpdateSchema = Joi.object({
  title: Joi.string(),
  developer: Joi.string(),
  price: Joi.number(),
  releaseDate: Joi.date(),
  genres: Joi.array().items(Joi.string()),
  platforms: Joi.array().items(Joi.string()),
});
