const { axios } = require("./config");

// Constants
const baseUrl = "https://pixabay.com/api/?";
const ApiKeyString = `key=${process.env.PIXABAY_KEY}`;
const options = `&image_type=photo`;

// Gets link to an image from Pixabay
const getImage = async (country, parameter) => {
  // Encoding the city and country names
  const encodedParameter = encodeURIComponent(parameter);
  const encodedCountry = encodeURIComponent(country);
  // Adding country to the query string as well to make sure
  // we get an image from the right city in the right country
  const queryString = `&q=${encodedParameter}+${encodedCountry}`;

  // Calling the API
  const response = await axios.get(
    `${baseUrl}${ApiKeyString}${queryString}${options}`
  );

  try {
    // Returning first image link from the response object
    if (response.data.hits[0]) return response.data.hits[0].largeImageURL;
    else return getImage(country, "flag");
  } catch (error) {
    console.log("getImage error", error);
  }
};

module.exports = { getImage };
