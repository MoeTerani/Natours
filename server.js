//Thing that are general and NOT specific to express will be here like this
//F.EX  enviromental variables
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// ---------start the server------------
console.log(process.env.NODE_ENV); // logging the
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
