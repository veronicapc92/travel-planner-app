// Setting up empty JS object to store the destination
// entered by the user via the input form on the client side
let data = {};

// Express to run server and routes
const express = require("express");

// Starting up an instance of app
const app = express();

// Using body-parser as middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require("cors");
app.use(cors());

// Dotenv for securing API key
const dotenv = require("dotenv");
dotenv.config();

// Axios for making HTTP requests
const axios = require("axios");

// Initialising the main project folder
app.use(express.static("dist"));

const port = 8081;
// Starting up the server
app.listen(port, () => console.log(`App listening on port ${port}...`));

// Gets data from Geonames
const getCoordinates = async () => {
  const encodedCity = encodeURIComponent(data.city);

  const response = await axios.get(
    `http://api.geonames.org/searchJSON?q=${encodedCity}&username=${process.env.GEONAMES_KEY}`
  );

  try {
    const citiesArray = response.data.geonames;
    for (city of citiesArray)
      if (city.countryName.toLowerCase() === data.country.toLowerCase()) {
        data.city = city.name;
        data.country = city.countryName;
        return city;
      }
  } catch (error) {
    console.log("getCoordinates error", error);
  }
};

// Gets data from Weatherbit
const getWeather = async (res) => {
  const response = await axios.get(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${res.lat}&lon=${res.lng}&key=${process.env.WEATHERBIT_KEY}`
  );

  try {
    const forecastArray = response.data.data;
    for (forecast of forecastArray)
      if (forecast.datetime === data.departureDate) {
        data.temperature = forecast.temp;
        data.weather = forecast.weather.description;
        data.windSpeed = forecast.wind_spd;
        data.precipitation = forecast.pop;
      }
    return data;
  } catch (error) {
    console.log("getWeather error", error);
  }
};

const getImage = async () => {
  const encodedCity = encodeURIComponent(data.city);
  const encodedCountry = encodeURIComponent(data.country);
  const response = await axios.get(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${encodedCity}+${encodedCountry}&image_type=photo`
  );

  try {
    data.imageURL = response.data.hits[0].largeImageURL;
    return data;
  } catch (error) {
    console.log("getImage error", error);
  }
};

// POST route
app.post("/data", (req, res) => {
  data.city = req.body.city;
  data.country = req.body.country;
  data.departureDate = req.body.departureDate;
  res.send(data);
});

// GET route
app.get("/data", async (req, res) => {
  try {
    const response = await getCoordinates();
    await getWeather(response);
    await getImage();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
