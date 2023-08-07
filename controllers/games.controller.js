import httpStatus from "../helpers/httpStatus.js";
import { prismaClientSoftDelete as prisma } from "../database/prisma.js";

export const gamesController = () => {
  const createGame = async (req, res, next) => {
    try {
      const { title, developer, price, releaseDate, genres, platforms } =
        req.body;
      const dateObject = new Date(releaseDate);
      const dateParsed = dateObject.toISOString();

      const game = await prisma.game.create({
        data: {
          title,
          developer,
          price,
          releaseDate: dateParsed,
          genres: {
            connectOrCreate: genres.map((genre) => {
              return {
                where: {
                  name: genre,
                },
                create: {
                  name: genre,
                  deletedAt: null,
                },
              };
            }),
          },
          platforms: {
            connectOrCreate: platforms.map((platform) => {
              return {
                where: {
                  name: platform,
                },
                create: {
                  name: platform,
                },
              };
            }),
          },
        },
      });

      return res.status(httpStatus.CREATED).json({
        success: true,
        message: "prueba",
        data: game,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getGames = async (req, res, next) => {
    try {
      const games = await prisma.game.findMany({
        include: {
          genres: {
            select: {
              name: true,
            },
          },
          platforms: {
            select: {
              name: true,
            },
          },
        },
      });
      return res.status(httpStatus.OK).json({
        success: true,
        message: "Get games",
        data: games,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getGameById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const games = await prisma.game.findMany({
        where: {
          id: id,
        },
        include: {
          genres: {
            select: {
              name: true,
            },
          },
          platforms: {
            select: {
              name: true,
            },
          },
        },
      });
      return res.status(httpStatus.OK).json({
        success: true,
        message: "Get games",
        data: games,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, developer, price, releaseDate, genres, platforms } =
        req.body;

      const dateObject = new Date(releaseDate);
      const dateParsed = dateObject.toISOString();

      const game = await prisma.game.update({
        where: {
          id: id,
        },
        data: {
          title,
          developer,
          price,
          releaseDate: dateParsed,
          genres: {
            connectOrCreate: genres.map((genre) => {
              return {
                where: {
                  name: genre,
                },
                create: {
                  name: genre,
                },
              };
            }),
          },
          platforms: {
            connectOrCreate: platforms.map((platform) => {
              return {
                where: {
                  name: platform,
                },
                create: {
                  name: platform,
                },
              };
            }),
          },
        },
      });

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Game updated successfully",
        data: game,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteGame = async (req, res, next) => {
    const { id } = req.params;
    try {
      const game = await prisma.game.delete({
        where: {
          id: id,
        },
      });

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Game deleted successfully",
        data: game,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame,
  };
};
