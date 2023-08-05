import { userCreateSchema } from "../validations/userModel.js";

export const userValidation = (req, res, next) => {
  const data = req.body;
  const { error } = userCreateSchema.validate(data);

  error ? next(error) : next();
};
