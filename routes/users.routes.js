import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";

import {
  userCreateValidation,
  userUpdateValidation,
} from "../middlewares/validations.js";
import { auth } from "../middlewares/auth.js";

export const usersRoutes = () => {
  const usersRouter = Router();
  const { getUsers, getUserById, createUser, updateUser, deleteUser } =
    usersController();

  usersRouter
    .route("/users")
    .get(auth, getUsers)
    .post(userCreateValidation, createUser);

  usersRouter
    .route("/users/:id")
    .get(auth, getUserById)
    .put(userUpdateValidation, updateUser)
    .delete(auth, deleteUser);

  return usersRouter;
};
