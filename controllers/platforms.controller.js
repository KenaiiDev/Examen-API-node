import httpStatus from "../helpers/httpStatus.js";
import { prismaClientSoftDelete as prisma } from "../database/prisma.js";

export const platformsController = () => {
  const createPlatform = async (req, res, next) => {
    try {
      const { name, manufacturer, releaseDate } = req.body;
      const dateObject = new Date(releaseDate);
      const dateParsed = dateObject.toISOString();
      const platform = await prisma.platform.create({
        data: {
          name,
          manufacturer,
          releaseDate: dateParsed,
        },
      });
      res.status(httpStatus.CREATED).json({
        success: true,
        message: "Platform created successfully",
        data: platform,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getPlatforms = async (req, res, next) => {
    try {
      const platforms = await prisma.platform.findMany();
      res.status(httpStatus.OK).json({
        success: true,
        message: "Get platforms",
        data: platforms,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getPlatformById = async (req, res, next) => {
    try {
      const platform = await prisma.platform.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(httpStatus.OK).json({
        success: true,
        message: "Get platform by id",
        data: platform,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updatePlatform = async (req, res, next) => {
    try {
      const { name, manufacturer, releaseDate } = req.body;
      const { id } = req.params;

      const dateObject = new Date(releaseDate);
      const dateParsed = dateObject.toISOString();

      const platform = await prisma.platform.update({
        where: {
          id: id,
        },
        data: {
          name,
          manufacturer,
          releaseDate: dateParsed,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Platform updated successfully",
        data: platform,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deletePlatform = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPlatform = await prisma.platform.delete({
        where: {
          id: id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Platform deleted successfully",
        data: deletedPlatform,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createPlatform,
    getPlatforms,
    getPlatformById,
    updatePlatform,
    deletePlatform,
  };
};
