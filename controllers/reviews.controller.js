import httpStatus from "../helpers/httpStatus.js";
import { prismaClientSoftDelete as prisma } from "../database/prisma.js";

export const reviewsController = () => {
  const createReview = async (req, res, next) => {
    try {
      const { rating, content, game, author } = req.body;
      const review = await prisma.review.create({
        data: {
          rating,
          content,
          game: {
            connect: {
              id: game,
            },
          },
          author: {
            connect: {
              id: author,
            },
          },
        },
      });

      res.status(httpStatus.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: review,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getReviews = async (req, res, next) => {
    try {
      const reviews = await prisma.review.findMany({
        include: {
          game: {
            select: {
              title: true,
            },
          },
          author: {
            select: {
              username: true,
            },
          },
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get reviews",
        data: reviews,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getReviewById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviews = await prisma.review.findMany({
        where: {
          id: id,
        },
        include: {
          game: {
            select: {
              title: true,
            },
          },
          author: {
            select: {
              username: true,
            },
          },
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get reviews",
        data: reviews,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateReview = async (req, res, next) => {
    try {
      const { rating, content } = req.body;
      const { id } = req.params;

      const review = await prisma.review.update({
        where: {
          id: id,
        },
        data: {
          rating,
          content,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Review updated successfully",
        data: review,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteReview = async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await prisma.review.delete({
        where: {
          id: id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Review deleted successfully",
        data: review,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
  };
};
