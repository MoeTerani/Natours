const fs = require('fs');

//we read the file on top level because they are read once per request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ALL CALLBACK FUNCTIONS SEPERATED HERE

// ADD a check ID middleware to automatically check the id of each http request for tours
exports.checkID = (req, res, next, value) => {
  console.log(`Tour ID is: ${value}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID'
    });
  }
  next();
};

//----------challenge-------------
//create a middlware function , check if the body containg name and price property is
// if not , send back a 400 bad reequest message.admin-nav
//ADD to post handler stack to

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestesAt: req.requestTime,
    results: tours.length, // whenever sending an Array to client , would be helpful to send the lenght of the array so we know how many obj we Are recieving.
    data: { tours: tours } //first tours is same as the URL tours and the secong one is the variable that we want to send as respose
  });
};

exports.getTour = (req, res) => {
  console.log(req.params); // information about the id is stored in req.params

  const id = req.params.id * 1; // Nice trick to turn string into number inside java script
  const tour = tours.find(tour => tour.id === id); // use find method to return a new first object with the same id

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated Tour here ...>' }
  });
};

exports.deleteTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    data: null
  });
};
