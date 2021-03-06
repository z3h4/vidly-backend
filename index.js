require('express-async-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const app = express();

require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT | 3000;
const server = app.listen(port, () => console.log(`Listening to port ${port}`));

module.exports = server;
