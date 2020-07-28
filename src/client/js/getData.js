export const getData = async (url) => {
  const response = await fetch(url);

  try {
    const newData = await response.json();
    return newData;
  } catch (eror) {
    console.log("getData error", error);
  }
};
