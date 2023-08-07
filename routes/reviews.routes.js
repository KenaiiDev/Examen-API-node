import { Router } from "express";
import { reviewsController } from "../controllers/reviews.controller.js";

import {
  reviewCreateValidation,
  reviewUpdateValidation,
} from "../middlewares/validations.js";

import { auth } from "../middlewares/auth.js";

export const reviewsRoutes = () => {
  const reviewsRouter = Router();
  const {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
  } = reviewsController();

  reviewsRouter
    .route("/reviews")
    .post(auth, reviewCreateValidation, createReview)
    .get(getReviews);

  reviewsRouter
    .route("/reviews/:id")
    .get(getReviewById)
    .put(auth, reviewUpdateValidation, updateReview)
    .delete(auth, deleteReview);

  return reviewsRouter;
};
