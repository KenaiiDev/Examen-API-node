import httpStatus from "../helpers/httpStatus.js";
import { prismaClientSoftDelete as prisma } from "../database/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
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

  const getUserById = async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(httpStatus.OK).json({
        success: true,
        message: "Get user by id",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const { id } = req.params;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createUser,
    deleteUser,
    getUsers,
    getUserById,
    updateUser,
  };
};
