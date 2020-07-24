import "./client/styles/style.scss";

const destinationInput = document.getElementById("destination");
const submitButton = document.getElementById("submit");

// const postDestination = () => {
//     const response = await fetch("")
// }

const handleSubmit = (e) => {
  e.preventDefault();
  // POST request to the server
  postDestination();
};

submitButton.addEventListener("click", (e) => handleSubmit(e));
