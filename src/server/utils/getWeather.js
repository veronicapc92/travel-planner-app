const { axios } = require("./config");
const { calculateDaysLeft } = require("./calculateDaysLeft");

// Constants
const ApiKeyString = `&key=${process.env.WEATHERBIT_KEY}`;

// Gets data from Weatherbit
const getWeather = async (lat, lon, dataObject) => {
  const coordinatesString = `lat=${lat}&lon=${lon}`;
  const diffDays = calculateDaysLeft(dataObject.departureDate);

  // If the user goes on holiday in more than 16 days
  // (16 days is as far as the forecast API can go)
  if (diffDays > 16) {
    return undefined;
  }

  // Changing the API URL dynamically depending on the number of
  // days left until the user goes on holiday
  const baseUrl =
    diffDays <= 7
      ? "https://api.weatherbit.io/v2.0/current?"
      : "https://api.weatherbit.io/v2.0/forecast/daily?";

  // Calling the API
  const response = await axios.get(
    `${baseUrl}${coordinatesString}${ApiKeyString}`
  );

  try {
    const forecastArray = response.data.data;

    // If the user goes on holiday in one week or less
    if (diffDays <= 7) {
      forecastArray[0].type = "Current weather";
      return forecastArray[0];
    }

    // If the user goes on holiday in more than one week
    // Find the forecast in the forecast array whose date matches the
    // departure date specified by the user
    for (forecast of forecastArray)
      if (forecast.datetime === dataObject.departureDate) {
        forecast.type = "Forecasted weather";
        return forecast;
      }
  } catch (error) {
    console.log("getWeather error", error);
  }
};

module.exports = { getWeather };
