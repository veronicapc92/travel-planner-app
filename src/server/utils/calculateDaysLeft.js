const calculateDaysLeft = (date) => {
  const today = new Date();
  const travelDate = new Date(date);
  const diffTime = travelDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

module.exports = { calculateDaysLeft };
