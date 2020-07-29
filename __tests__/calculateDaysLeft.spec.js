import { calculateDaysLeft } from "../src/server/utils/calculateDaysLeft";

test("it should return a negative number", () => {
  expect(calculateDaysLeft("2020-07-28")).toBeLessThan(0);
});
