import each from "jest-each";
import moment from "moment";

import { getHours, getMinutes, getSeconds } from "./timeFormat";

describe("Time Format", () => {
  each`
    time                                | expectedHours
    ${"2020-03-10T09:22:30+01:00"}      | ${"9"}
    ${"2020-03-10T15:22:30+01:00"}      | ${"15"}
    ${"2020-03-10T00:00:00.500+01:00"}  | ${"0"}
  `.test("should getHours", ({ time, expectedHours }) => {
    const timeMoment = moment.parseZone(time);
    expect(getHours(timeMoment)).toBe(expectedHours);
  });
  each`
    time                                | expectedMinutes
    ${"2020-03-10T09:22:30+01:00"}      | ${"22"}
    ${"2020-03-10T15:09:30+01:00"}      | ${"09"}
    ${"2020-03-10T00:00:00.500+01:00"}  | ${"00"}
`.test("should getMinutes", ({ time, expectedMinutes }) => {
    const timeMoment = moment.parseZone(time);
    expect(getMinutes(timeMoment)).toBe(expectedMinutes);
  });
  each`
    time                                | expectedSeconds
    ${"2020-03-10T09:22:30+01:00"}      | ${"30"}
    ${"2020-03-10T15:09:04+01:00"}      | ${"04"}
    ${"2020-03-10T00:00:00.500+01:00"}  | ${"00"}
`.test("should getSeconds", ({ time, expectedSeconds }) => {
    const timeMoment = moment.parseZone(time);
    expect(getSeconds(timeMoment)).toBe(expectedSeconds);
  });
});
