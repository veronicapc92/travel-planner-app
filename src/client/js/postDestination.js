export const postDestination = async (url, city, country, departureDate) => {
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
