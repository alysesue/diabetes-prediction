'use strict';

// require packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const appRouter = require('./routes/appRouter');

// middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // comment out if not using view engine just html files

// set routes to use express app
appRouter(app);

// server startup
app.listen(3000, function () {
  console.log('App listening on port 3000');
})

// export module so can use in other modules
module.exports = app;