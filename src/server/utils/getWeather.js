const { axios } = require("./config");

// Constants
const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const ApiKeyString = `&key=${process.env.WEATHERBIT_KEY}`;

// Gets data from Weatherbit
const getWeather = async (lat, lon, dataObject) => {
  const coordinatesString = `lat=${lat}&lon=${lon}`;

  // Calling the API
  const response = await axios.get(
    `${baseUrl}${coordinatesString}${ApiKeyString}`
  );

  try {
    const forecastArray = response.data.data;

    // Finding the forecast in the forecast array whose date matches the
    // departure date specified by the user
    for (forecast of forecastArray)
      if (forecast.datetime === dataObject.departureDate) return forecast;
  } catch (error) {
    console.log("getWeather error", error);
  }
};

module.exports = { getWeather };
