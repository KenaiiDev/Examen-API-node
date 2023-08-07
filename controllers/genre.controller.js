import httpStatus from "../helpers/httpStatus.js";
import { prismaClientSoftDelete as prisma } from "../database/prisma.js";

export const genreController = () => {
  const createGenre = async (req, res, next) => {
    try {
      const { name } = req.body;
      const genre = await prisma.genre.create({
        data: {
          name,
        },
      });
      res.status(httpStatus.CREATED).json({
        success: true,
        message: "Genre created successfully",
        data: genre,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getGenres = async (req, res, next) => {
    try {
      const genres = await prisma.genre.findMany();
      res.status(httpStatus.OK).json({
        success: true,
        message: "Get genres",
        data: genres,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getGenreById = async (req, res, next) => {
    try {
      const genre = await prisma.genre.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(httpStatus.OK).json({
        success: true,
        message: "Get genre by id",
        data: genre,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateGenre = async (req, res, next) => {
    try {
      const { name } = req.body;
      const { id } = req.params;

      const genre = await prisma.genre.update({
        where: {
          id: id,
        },
        data: {
          name,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Genre updated successfully",
        data: genre,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteGenre = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedGenre = await prisma.genre.delete({
        where: {
          id: id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Genre deleted successfully",
        data: deletedGenre,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
  };
};
