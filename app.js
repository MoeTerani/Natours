const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes');
// ----------MIDDLEWARE FUNCTIONS--------------------------------

// the order of the middleware function are IMPOETANT
app.use(express.json());

//----------MORGAN--------------------------------
app.use(morgan('dev')); // console.log out the incoming request
// our own middleware function
app.use((req, res, next) => {
  console.log('HELLO FROM THE MIDDLEWARE 👋🏼');
  next();
});

// our own middleware function
app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

//-----------CALLBACK FUNCTIONS--------------------------------

//---------USERS HANDLERS------------

//-----------ALL HTTP Request--------------------------------

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour); //Add a unique identifier like id to url

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour); // update only a part of the object

// app.delete('/api/v1/tours/:id', deleteTour); // HAndling Delete -  NOTE : NOT THE REAL WORLD EXAMPLE ONLY FOR DEMONSTRATION

//-----------refactoring 2--------------------------------

// tour route middleware
app.use('/api/v1/tours', tourRouter);

// user route middleware
app.use('/api/v1/users', userRouter);

module.exports = app;
