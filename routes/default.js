const express = require('express');

const router = express.Router();

// Setting up the routes to different pages (home,about,confirm...)
router.get('/', function (req, res) {
  // Response rendering the html file
  res.render('index');
});

router.get('/about', function (req, res) {
  res.render('about');
});

module.exports = router;
