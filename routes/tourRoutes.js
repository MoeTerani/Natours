const express = require('express');

const tourController = require('../controllers/tourController'); // import tour handlers from controllers part of MVC

//tour ROUTER
const router = express.Router();

//PARAM middleware
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
