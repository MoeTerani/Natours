const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

//----------MIDDLEWARE FUNCTIONS--------------------------------

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

//we read the file on top level because they are read once per request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//-----------CALLBACK FUNCTIONS--------------------------------

// ALL CALLBACK FUNCTIONS SEPERATED HERE
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestesAt: req.requestTime,
    results: tours.length, // whenever sending an Array to client , would be helpful to send the lenght of the array so we know how many obj we Are recieving.
    data: { tours: tours } //first tours is same as the URL tours and the secong one is the variable that we want to send as respose
  });
};

const getTour = (req, res) => {
  console.log(req.params); // information about the id is stored in req.params

  const id = req.params.id * 1; // Nice trick to turn string into number inside java script
  const tour = tours.find(tour => tour.id === id); // use find method to return a new first object with the same id

  //if (id > tours.length) // check to see if the id exist

  if (!tours) {
    // if the find method doesn't find any match then tour object is undefined and the id doesn't exist
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1; // get the latest id of the object + 1 for the new object

  const newTours = Object.assign({ id: newId }, req.body); // merge the new key value and the incomin object in the req.body
  //   const newTour = { ...req.body, id: newId } //Alternative 2:    spread operator has the same functionality as Object.assign

  console.log(newTours);

  //add the new incomin object to the array of the existing tours
  tours.push(newTours);

  //write the new tours array to the json file after we have stringified it.§
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      // status (201) mean newly created on the server
      // we ususaly send the newly created object as response as asoon as the file has been written
      res.status(201).json({
        status: 'success',
        data: { tours: newTours }
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated Tour here ...>' }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID'
    });
  }
  res.status(202).json({
    status: 'success',
    data: null
  });
};

//---------USERS HANDLERS------------

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not implemented'
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not implemented'
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not implemented'
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not implemented'
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not implemented'
  });
};

//-----------ALL HTTP Request--------------------------------

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour); //Add a unique identifier like id to url

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour); // update only a part of the object

// app.delete('/api/v1/tours/:id', deleteTour); // HAndling Delete -  NOTE : NOT THE REAL WORLD EXAMPLE ONLY FOR DEMONSTRATION

//-----------refactoring 2--------------------------------

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//---------start the server------------
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
