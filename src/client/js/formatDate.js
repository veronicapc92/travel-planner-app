export const formatDate = (date) => {
  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const monthNumber = dateObject.getMonth();
  const month = monthsArray[monthNumber];
  const year = dateObject.getFullYear();

  return { day, month, year };
};
