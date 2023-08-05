import httpStatus from "../helpers/httpStatus.js";
import prisma from "../database/prisma.js";
import bcrypt from "bcrypt";

export const usersController = () => {
  const createUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      res.status(httpStatus.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteUser = (req, res, next) => {
    return res.status(httpStatus.OK).json({ message: "Delete User" });
  };

  const getUsers = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.status(httpStatus.OK).json({
        success: true,
        message: "Get users",
        data: users,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };
  const getUserById = (req, res, next) => {
    return res.status(httpStatus.OK).json({ message: "Get user by id" });
  };

  const updateUser = (req, res, next) => {
    return res.status(httpStatus.OK).json({ message: "Update user" });
  };

  return {
    createUser,
    deleteUser,
    getUsers,
    getUserById,
    updateUser,
  };
};
