//Thing that are general and NOT specific to express will be here like this
//F.EX  enviromental variables
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// mongoose.connect(process.env.DATABSE_LOCAL,())      // This how we connect the local database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(connect => {
    // console.log(connect.connections); // log the connections
    console.log('DB connection successfu!');
  });

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

const testTour = new Tour({
  name: 'The park ranger',
  price: 500
});
// const testTour = new Tour({
//   name: 'The forest hiker',
//   rating: 4.7,
//   price: 497
// });

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR 💥', err);
  });

const app = require('./app');

// ---------start the server------------
console.log(process.env.NODE_ENV); // logging the
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
