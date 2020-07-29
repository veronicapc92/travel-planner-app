import { formatDate } from "../src/client/js/formatDate";

test("Should return {day: 28, month: 'Jul', year: 2020}", () => {
  expect(formatDate("2020-07-28")).toEqual({
    day: 28,
    month: "Jul",
    year: 2020,
  });
});
