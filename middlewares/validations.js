import {
  userCreateSchema,
  userUpdateSchema,
} from "../validations/userModel.js";
import {
  authRegisterSchema,
  authLoginSchema,
  authRefreshSchema,
} from "../validations/authModel.js";

export const userCreateValidation = (req, res, next) => {
  const data = req.body;
  const { error } = userCreateSchema.validate(data);

  error ? next(error) : next();
};

export const userUpdateValidation = (req, res, next) => {
  const data = req.body;

  const { error } = userUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const authRegisterValidation = (req, res, next) => {
  const data = req.body;

  const { error } = authRegisterSchema.validate(data);

  error ? next(error) : next();
};

export const authLoginValidation = (req, res, next) => {
  const data = req.body;

  const { error } = authLoginSchema.validate(data);

  error ? next(error) : next();
};

export const authRefreshValidation = (req, res, next) => {
  const data = req.body;

  const { error } = authRefreshSchema.validate(data);

  error ? next(error) : next();
};
