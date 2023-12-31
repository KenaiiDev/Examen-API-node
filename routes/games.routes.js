import { Router } from "express";
import { gamesController } from "../controllers/games.controller.js";

import {
  gamesCreateValidation,
  gamesUpdateValidation,
} from "../middlewares/validations.js";

import { auth } from "../middlewares/auth.js";

export const gamesRoutes = () => {
  const gamesRouter = Router();
  const {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame,
    getGameByQuery,
    getGameByPlatformOrGenre,
  } = gamesController();

  gamesRouter.route("/games/filter").get(getGameByPlatformOrGenre);

  gamesRouter.route("/games/search").get(getGameByQuery);

  gamesRouter
    .route("/games")
    .post(auth, gamesCreateValidation, createGame)
    .get(getGames);

  gamesRouter
    .route("/games/:id")
    .get(getGameById)
    .put(auth, gamesUpdateValidation, updateGame)
    .delete(auth, deleteGame);

  return gamesRouter;
};
