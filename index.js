import express from "express";
import dotenv from "dotenv";

import { usersRoutes } from "./routes/users.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api", usersRoutes());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GameXpress API listening on port ${PORT}`);
});
