const express = require('express');

const tourController = require('../controllers/tourController'); // import tour handlers from controllers part of MVC

//tour ROUTER
const router = express.Router();

//PARAM middleware to automatically check incomin http request and follow DRY
router.param('id', tourController.checkID);

//create a middlware function , check if the body containg name and price property is
// if not , send back a 400 bad reequest message.admin-nav
//ADD to post handler stack to
//solution:    tourController.checkBody

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
