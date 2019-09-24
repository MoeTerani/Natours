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

const app = require('./app');

// ---------start the server------------
console.log(process.env.NODE_ENV); // logging the
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
