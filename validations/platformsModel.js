import Joi from "joi";

export const platformCreateSchema = Joi.object({
  name: Joi.string().required(),
  manufacturer: Joi.string(),
  releaseDate: Joi.date(),
});

export const platformUpdateSchema = Joi.object({
  name: Joi.string(),
  manufacturer: Joi.string(),
  releaseDate: Joi.date(),
});
