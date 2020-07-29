import { postDestination } from "./postDestination";
import { getData } from "./getData";
import { updateUI } from "./updateUI";

const url = "http://localhost:8081/data";
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const departureDateInput = document.getElementById("departure-date");

export const handleSubmit = (e) => {
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
