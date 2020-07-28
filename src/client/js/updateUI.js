import { formatDate } from "./formatDate";

const destination = document.getElementById("destination");
const departure = document.getElementById("departure");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const precipitation = document.getElementById("precipitation");
const windSpeed = document.getElementById("wind-speed");
const cityImage = document.getElementById("city-image");
const weatherDataType = document.getElementById("weather-data-type");
const results = document.getElementById("results");

export const updateUI = async (data) => {
  // Showing the results container
  results.classList.remove("hidden");
  results.classList.add("visible");

  if (data.city === "not found" && data.country === "not found") {
    destination.textContent = `Destination not found.`;
    return;
  }
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
    ? (precipitation.textContent = `Probability of rain: ${data.precipitation}%`)
    : (precipitation.textContent = `Feels-like temperature: ${Math.round(
        data.appTemp
      )} °C`);
};
