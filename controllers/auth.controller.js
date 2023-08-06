import httpStatus from "../helpers/httpStatus.js";
import { prismaClientSoftDelete as prisma } from "../database/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authController = () => {
  const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, message: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, message: "Invalid Credentials" });

      const payload = {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "User logged in successfully",
        token,
        refreshToken,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const register = async (req, res, next) => {
    try {
      const { username, email, password, birthday } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          birthday: new Date(birthday),
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

  const refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      const payload = {
        user: {
          id: decoded.user.id,
          username: decoded.user.username,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Token refreshed successfully",
        token,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    register,
    refresh,
  };
};
