import "./client/styles/style.scss";
import { handleSubmit } from "./client/js/handleSubmit";

const submitButton = document.getElementById("submit");
const results = document.getElementById("results");
const closeButton = document.getElementById("close-button");

submitButton.addEventListener("click", (e) => handleSubmit(e));

closeButton.addEventListener("click", () => {
  results.classList.remove("visible");
  results.classList.add("hidden");
});
