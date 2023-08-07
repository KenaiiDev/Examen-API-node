import { Router } from "express";
import { platformsController } from "../controllers/platforms.controller.js";

import {
  platformCreateValidation,
  platformUpdateValidation,
} from "../middlewares/validations.js";

import { auth } from "../middlewares/auth.js";

export const platformsRoutes = () => {
  const platformsRouter = Router();
  const {
    createPlatform,
    getPlatforms,
    getPlatformById,
    updatePlatform,
    deletePlatform,
  } = platformsController();

  platformsRouter
    .route("/platforms")
    .post(auth, platformCreateValidation, createPlatform)
    .get(getPlatforms);

  platformsRouter
    .route("/platforms/:id")
    .get(getPlatformById)
    .put(auth, platformUpdateValidation, updatePlatform)
    .delete(auth, deletePlatform);

  return platformsRouter;
};
