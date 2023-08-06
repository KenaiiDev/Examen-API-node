import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

import {
  authRegisterValidation,
  authLoginValidation,
  authRefreshValidation,
} from "../middlewares/validations.js";

export const authRoutes = () => {
  const authRouter = Router();
  const { login, register, refresh } = authController();

  authRouter.route("/auth/login").post(authLoginValidation, login);

  authRouter.route("/auth/register").post(authRegisterValidation, register);

  authRouter.route("/auth/refresh").post(authRefreshValidation, refresh);

  return authRouter;
};
