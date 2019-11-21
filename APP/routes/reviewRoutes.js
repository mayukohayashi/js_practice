const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

// POST /tour/1d34fe(tourID)/reviews
// GET /tour/1d34fe(tourID)/reviews
// POST /reviews
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

// router
//   .route('/review/:id')
//   .get(reviewController.getReview)
//   .patch(reviewController.updateReview)
//   .delete(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.deleteReview
//   );

module.exports = router;
