import "./client/styles/style.scss";

const url = "http://localhost:8081/data";
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const departureDateInput = document.getElementById("departure-date");
const submitButton = document.getElementById("submit");
const results = document.getElementById("results");
const destination = document.getElementById("destination");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const precipitation = document.getElementById("precipitation");
const windspeed = document.getElementById("windspeed");

const postDestination = async (city, country, departureDate) => {
  const data = { city: city, country: country, departureDate: departureDate };
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("postDestination error", error);
  }
};

const getData = async () => {
  const response = await fetch(url);

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (eror) {
    console.log("getData error", error);
  }
};

const updateUI = async (data) => {
  results.classList.remove("hidden");
  results.classList.add("visible");
  destination.textContent = `${data.city}, ${data.country} ~ ${data.departureDate}`;
  weather.textContent = data.weather;
  temperature.textContent = `${data.temperature} °C`;
  precipitation.textContent = `${data.precipitation}%`;
  windspeed.textContent = `${data.windspeed} m/s`;
};

const handleSubmit = (e) => {
  e.preventDefault();
  postDestination(
    cityInput.value,
    countryInput.value,
    departureDateInput.value
  ).then(getData().then((data) => updateUI(data)));
};

submitButton.addEventListener("click", (e) => handleSubmit(e));
