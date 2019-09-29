const Tour = require('./../models/tourModel');

/* //we read the file on top level because they are read once per request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); */

// ALL CALLBACK FUNCTIONS SEPERATED HERE

//----------challenge-------------
//create a middlware function , check if the body containg name and price property is
// if not , send back a 400 bad reequest message.admin-nav
//ADD to post handler stack to

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      data: { tours: tours }

      /*   results: tours.length, // whenever sending an Array to client , would be helpful to send the lenght of the array so we know how many obj we Are recieving.
    data: { tours: tours } //first tours is same as the URL tours and the secong one is the variable that we want to send as respose
   */
    });
  } catch (err) {
    res.status(400).json({
      status: 'faill',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //finfById() = Tour.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: { tour: tour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'faill',
      message: err
    });
  }
  const id = req.params.id * 1; // Nice trick to turn string into number inside java script

  /*   const tour = tours.find(tour => tour.id === id); // use find method to return a new first object with the same id

  res.status(200).json({
    status: 'success',
    data: { tour }
  }); */
};

exports.createTour = async (req, res) => {
  try {
    /* // First alternative to create new model
  const newTour = new Tour({});
  newTour.save()  // Will return a promise */

    // The better alternative
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',

      data: { tours: newTour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'faill',
      message: err
    });
  }
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
