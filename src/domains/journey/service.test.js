import each from "jest-each";
import getMissions, { getMissionsSchedules } from "./service";

describe("journey services", () => {
  describe("getMissionsSchedules", () => {
    test("should get Missions Schedules", () => {
      const missionsSchedules = getMissionsSchedules();
      expect(missionsSchedules).toMatchSnapshot();
    });
  });

  describe("getMissions", () => {
    each([
      ["cergy+prefecture", "houilles", ["NANI"]],
      ["chatelet+les+halles", "sucy+bonneuil", ["NANI", "NOTE"]],
      ["maisons+laffitte", "nation", ["NANI", "NOTE"]],
      ["auber", "gare+de+lyon", ["NANI", "NOTE", "QIKI"]],
      ["charles+de+gaulle+etoile", "marne+la+vallee+chessy", ["QIKI"]],
    ]).test(
      "should get missions from '%s' to '%s'",
      (departure, arrival, expectedMissions) => {
        const actualMissions = getMissions(departure, arrival);
        expect(actualMissions).toEqual(expectedMissions);
      }
    );
  });
});
