import { Router } from "express";
import { genreController } from "../controllers/genre.controller.js";

import {
  genreCreateValidation,
  genreUpdateValidation,
} from "../middlewares/validations.js";

import { auth } from "../middlewares/auth.js";

export const genresRoutes = () => {
  const genreRoutes = Router();
  const { createGenre, getGenres, getGenreById, updateGenre, deleteGenre } =
    genreController();

  genreRoutes
    .route("/genres")
    .post(auth, genreCreateValidation, createGenre)
    .get(getGenres);

  genreRoutes
    .route("/genres/:id")
    .get(getGenreById)
    .put(auth, genreUpdateValidation, updateGenre)
    .delete(auth, deleteGenre);

  return genreRoutes;
};
