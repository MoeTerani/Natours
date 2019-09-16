const fs = require('fs');
const express = require('express');
const app = express();

// middleware
app.use(express.json());

//we read the file on top level because they are read once per request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length, // whenever sending an Array to client , would be helpful to send the lenght of the array so we know how many obj we Are recieving.
    data: { tours: tours } //first tours is same as the URL tours and the secong one is the variable that we want to send as respose
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server! :D', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can write to this endpoint');
// });
