import { formatDate } from "./formatDate";

const destination = document.getElementById("destination");
const departure = document.getElementById("departure");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const additionalInfo = document.getElementById("precipitation");
const windSpeed = document.getElementById("wind-speed");
const cityImage = document.getElementById("city-image");
const weatherDataType = document.getElementById("weather-data-type");
const results = document.getElementById("results");

export const updateUI = async (data) => {
  // Showing the results container
  results.classList.remove("hidden");
  results.classList.add("visible");

  // Handling the case where the user entered a past date
  if (data.departureDate === "invalid date") {
    destination.textContent = "Please enter a valid date.";
    return;
  }

  // Handling the case where the destination hasn't been found
  if (data.city === "not found" && data.country === "not found") {
    destination.textContent = `Destination not found.`;
    return;
  }

  // Handling the case where the trip is in more than 16 days
  // (16 days is as far as the forecast API can go)
  if (data.temperature === "not found") {
    destination.textContent = `Your trip is too far in time for us to forecast the weather. Please try again when your trip is closer.`;
    return;
  }

  // Handling the case where the trip is to far in time to get
  // a forecast from the API

  // Formatting departure date nicely
  const formattedDate = formatDate(data.departureDate);
  const date = `${formattedDate.day} ${formattedDate.month} ${formattedDate.year}`;
  // Changing the data in the results container
  destination.textContent = `${data.city}, ${data.country}`;
  departure.textContent = `Departure date: ${date}`;
  cityImage.setAttribute("src", `${data.imageUrl}`);
  weatherDataType.textContent = `${data.type}`;
  weather.textContent = data.weather;
  temperature.textContent = `${Math.round(data.temperature)} °C`;
  windSpeed.textContent = `Wind speed: ${Math.round(data.windSpeed)} m/s`;

  // The "current weather API" doesn't return probability of precipitation,
  // only the "weather forecast API" does. So if probability of precipitation is undefined,
  // the feels-like temperature will be displayed instead
  typeof data.precipitation !== "undefined"
    ? (additionalInfo.textContent = `Probability of rain: ${data.precipitation}%`)
    : (additionalInfo.textContent = `Feels-like temperature: ${Math.round(
        data.appTemp
      )} °C`);
};
