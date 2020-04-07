import getMatchingDeparture from "./getMatchingDeparture";
import each from "jest-each";

const allDepartures = [
  {
    trainCode: "0924",
    departureTime: "2020-03-10T09:24:00+01:00",
    mission: "UPAC",
    displayAttributes: "09:24",
    displayDestination: "Cergy-Le-Haut",
  },
  {
    trainCode: "0929",
    departureTime: "2020-03-10T09:29:00+01:00",
    mission: "UPAC",
    displayAttributes: "09:29",
    displayDestination: "Cergy-Le-Haut",
  },
];

describe("train helpers", () => {
  describe("getDelay", () => {
    each([
      // standard cases
      ["0924", "0924"],
      ["0929", "0929"],
      // get the first item if not found
      ["XXXX", "0924"],
      ["", "0924"],
      [null, "0924"],
      // get the first item if not found (to improve)
      ["0925", "0924"],
      ["0928", "0924"],
      ["0930", "0924"],
    ]).test(
      "should search departure code '%s' and pick '%s'",
      (trainCode, expectedTrainCode) => {
        const actualDeparture = getMatchingDeparture(allDepartures, trainCode);
        const expectedDeparture = allDepartures.find(
          (d) => d.trainCode === expectedTrainCode
        );
        expect(actualDeparture).toEqual(expectedDeparture);
      }
    );
  });
});
