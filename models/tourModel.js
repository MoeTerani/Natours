const mongoose = require('mongoose');

// set up the mongoose schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Error: A tour must have a name'], // this is called a validator, validate if the data is there and throw an error if NOT.
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Error: A tour must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

// create a Tour model out of the tour schema
const Tour = mongoose.model('Tour', tourSchema); // convention to capoitilixe the name of the models and variables

module.exports = Tour;
