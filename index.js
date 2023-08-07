import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";

import { usersRoutes } from "./routes/users.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { gamesRoutes } from "./routes/games.routes.js";
import { genresRoutes } from "./routes/genres.routes.js";
import { platformsRoutes } from "./routes/platforms.routes.js";
import { reviewsRoutes } from "./routes/reviews.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"],
  })
);

app.use(
  "/api",
  usersRoutes(),
  authRoutes(),
  gamesRoutes(),
  genresRoutes(),
  platformsRoutes(),
  reviewsRoutes()
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GameXpress API listening on port ${PORT}`);
});
