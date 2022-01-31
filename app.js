// Bring in path module from nodejs
const path = require('path');

// Bring in express
const express = require('express');
// Bring in UUID package

const defaultToutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

// Put the express() function into the app variable
const app = express();

// Set the path so that the server know what to render and from where
app.set('views', path.join(__dirname, 'views'));
// Use the templating engine EJS
app.set('view engine', 'ejs');

// Serving static files like css and js
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultToutes);
app.use('/', restaurantRoutes);

// Handling if a page doesn't exist | custom middleware
app.use(function (req, res) {
  res.status(404).render('404');
});

//  Handling if the server has issues | custom middleware
app.use(function (error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
