const path = require('path');
// Bring in file system module from nodejs
const fs = require('fs');
// Creating a file path to the JSON file
const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  //JSON.parse() takes a JSON string and then transforms it into a JavaScript object.
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  // JSON.stringify() takes a JavaScript object and then transforms it into a JSON string
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
