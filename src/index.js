import "./client/styles/style.scss";

const url = "http://localhost:8081/data";
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const departureDateInput = document.getElementById("departure-date");
const submitButton = document.getElementById("submit");

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

const getWeather = async () => {
  const response = await fetch(url);

  try {
    const newData = await response.json();
    return newData;
  } catch (eror) {
    console.log("getWeather error", error);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  postDestination(
    cityInput.value,
    countryInput.value,
    departureDateInput.value
  ).then(getWeather().then((data) => console.log(data)));
};

submitButton.addEventListener("click", (e) => handleSubmit(e));
