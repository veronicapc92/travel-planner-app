const { axios } = require("./config");

// Constants
const baseUrl = "http://api.geonames.org/searchJSON?";
const ApiKeyString = `&username=${process.env.GEONAMES_KEY}`;

// Receives the name of a city and gets city data from Geonames
const getCityInfo = async (dataObject) => {
  // Encoding the city name
  const encodedCity = encodeURIComponent(dataObject.city);
  const queryString = `q=${encodedCity}`;

  // Calling the API
  const response = await axios.get(`${baseUrl}${queryString}${ApiKeyString}`);

  try {
    const citiesArray = response.data.geonames;
    // Handling the case where no city has been found
    if (response.data.geonames.length === 0) return undefined;

    // Finding the city in the results array whose country matches the country
    // specified by the user. This is to avoid displaying the wrong city
    // when two or more cities in different countries have the same name
    for (city of citiesArray)
      if (city.countryName.toLowerCase() === dataObject.country.toLowerCase())
        return city;
  } catch (error) {
    console.log("getCityInfo error", error);
  }
};

module.exports = { getCityInfo };
