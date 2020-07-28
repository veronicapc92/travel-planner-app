const { getCityInfo } = require("./utils/getCityInfo");
const { getWeather } = require("./utils/getWeather");
const { getImage } = require("./utils/getImage");

// Setting up empty JS object to store the city, country and departure date
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

// Initialising the main project folder
app.use(express.static("dist"));

const port = 8081;
// Starting up the server
app.listen(port, () => console.log(`App listening on port ${port}...`));

// POST route
app.post("/data", (req, res) => {
  // Updating the data object with the information entered by the user
  data.city = req.body.city;
  data.country = req.body.country;
  data.departureDate = req.body.departureDate;
  res.send(data);
});

// GET route
app.get("/data", async (req, res) => {
  try {
    const city = await getCityInfo(data);
    // Updating city and country in the data object to match the data
    // returned by the API. This is to make sure we display the right
    // city and country names on the client side even if the user has mispelled them
    if (typeof city !== "undefined") {
      data.city = city.name;
      data.country = city.countryName;

      const forecast = await getWeather(city.lat, city.lng, data);
      // Updating the data object with weather information
      data.temperature = forecast.temp;
      data.weather = forecast.weather.description;
      data.windSpeed = forecast.wind_spd;
      data.precipitation = forecast.pop;
      data.type = forecast.type;
      data.appTemp = forecast.app_temp;

      const imageUrl = await getImage(data.country, data.city);
      // Updating the data object with a link to an image of the city
      data.imageUrl = imageUrl;
    } else {
      data.city = "not found";
      data.country = "not found";
    }

    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
