import "./client/styles/style.scss";
import { postDestination } from "./client/js/postDestination";
import { getData } from "./client/js/getData";
import { updateUI } from "./client/js/updateUI";

const url = "http://localhost:8081/data";
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const departureDateInput = document.getElementById("departure-date");
const submitButton = document.getElementById("submit");
const results = document.getElementById("results");
const closeButton = document.getElementById("close-button");

const handleSubmit = (e) => {
  e.preventDefault();

  if (!cityInput.value) {
    cityInput.classList.remove("input");
    cityInput.classList.add("required");
  } else {
    cityInput.classList.remove("required");
    cityInput.classList.add("input");
  }
  if (!countryInput.value) {
    countryInput.classList.remove("input");
    countryInput.classList.add("required");
  } else {
    countryInput.classList.remove("required");
    countryInput.classList.add("input");
  }
  if (!departureDateInput.value) {
    departureDateInput.classList.remove("input");
    departureDateInput.classList.add("required");
  } else {
    departureDateInput.classList.remove("required");
    departureDateInput.classList.add("input");
  }

  if (cityInput.value && countryInput.value && departureDateInput.value)
    postDestination(
      url,
      cityInput.value,
      countryInput.value,
      departureDateInput.value
    ).then((data) => getData(url).then((data) => updateUI(data)));
};

submitButton.addEventListener("click", (e) => handleSubmit(e));

closeButton.addEventListener("click", () => {
  results.classList.remove("visible");
  results.classList.add("hidden");
});
