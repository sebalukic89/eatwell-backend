const e = require('express');
const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/confirm', function (req, res) {
  res.render('confirm');
});

router.get('/recommend', function (req, res) {
  res.render('recommend');
});

// Sending all of the data from the users input into a JSON file to be stored
router.post('/recommend', function (req, res) {
  // Creating a variable to store any user input
  const restaurant = req.body;
  // Creating a unique id using the uuid
  restaurant.id = uuid.v4();
  // Bring in the getStoredRestaurants() function from the utils folder from the restaurant-data.js
  const restaurants = resData.getStoredRestaurants();

  // Add the user intput into the JSON file
  restaurants.push(restaurant);

  // Bring in the storeRestaurants() from the utils folder from the restaurant-data.js
  resData.storeRestaurants(restaurants);

  // Rendering the confirm page
  res.redirect('/confirm');
});

// Retreaving all of the information from the JSON file to display the number of item inside the JSON file
router.get('/restaurants', function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === 'asc' && resA.name > resB.name) ||
      (order === 'desc' && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  // Render the restaurants page
  res.render('restaurants', {
    // The key numberOfRestaurants is used to display the number of stored restaurants in the JSON file
    // It is used on the restaurants.ejs page to display the number to the user
    numberOfRestaurants: storedRestaurants.length,
    // The key restaurants is used to all of the storeRestaurants variable
    // It is used in the restaurants.ejs when looping over each of the restaurants in the JSON file
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// Creating a dinamic fetching of the data
router.get('/restaurants/:id', function (req, res) {
  // Getting the restaurant id from the JSON file
  const restaurantId = req.params.id;

  const storedRestaurants = resData.getStoredRestaurants();

  // Checking if the id of a restaurant matches the id of storedRestaurants id, in other words, checking if the restaurant exists in the JSON file
  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      // the value restaurant is the constant from the for loop
      // the key restaurant  is the rrestaurant.name value I set in the restaurant-detail.ejs
      return res.render('restaurant-detail', { restaurant: restaurant });
    }
  }

  // Implementing a 404 page/error response
  res.status(404).render('404');
});

module.exports = router;
