import {
  userCreateSchema,
  userUpdateSchema,
} from "../validations/userModel.js";
import {
  authRegisterSchema,
  authLoginSchema,
  authRefreshSchema,
} from "../validations/authModel.js";
import {
  genreCreateSchema,
  genreUpdateSchema,
} from "../validations/genreModel.js";
import {
  platformCreateSchema,
  platformUpdateSchema,
} from "../validations/platformsModel.js";
import {
  gamesCreateSchema,
  gamesUpdateSchema,
} from "../validations/gamesModel.js";
import {
  reviewCreateSchema,
  reviewUpdateSchema,
} from "../validations/reviewsModel.js";

export const userCreateValidation = (req, res, next) => {
  const data = req.body;
  const { error } = userCreateSchema.validate(data);

  error ? next(error) : next();
};

export const userUpdateValidation = (req, _res, next) => {
  const data = req.body;

  const { error } = userUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const authRegisterValidation = (req, _res, next) => {
  const data = req.body;

  const { error } = authRegisterSchema.validate(data);

  error ? next(error) : next();
};

export const authLoginValidation = (req, _res, next) => {
  const data = req.body;

  const { error } = authLoginSchema.validate(data);

  error ? next(error) : next();
};

export const authRefreshValidation = (req, _res, next) => {
  const data = req.body;

  const { error } = authRefreshSchema.validate(data);

  error ? next(error) : next();
};

export const genreCreateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = genreCreateSchema.validate(data);

  error ? next(error) : next();
};

export const genreUpdateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = genreUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const platformCreateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = platformCreateSchema.validate(data);

  error ? next(error) : next();
};

export const platformUpdateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = platformUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const gamesCreateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = gamesCreateSchema.validate(data);

  error ? next(error) : next();
};

export const gamesUpdateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = gamesUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const reviewCreateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = reviewCreateSchema.validate(data);

  error ? next(error) : next();
};

export const reviewUpdateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = reviewUpdateSchema.validate(data);

  error ? next(error) : next();
};
