import each from "jest-each";
import { getMissions, getMissionsSchedules } from "./service";

describe("journey services", () => {
  describe("getMissionsSchedules", () => {
    test("should get Missions Schedules", () => {
      const missionsSchedules = getMissionsSchedules();
      expect(missionsSchedules).toMatchSnapshot();
    });
  });

  describe("getMissions", () => {
    each([
      ["cergy+prefecture", "houilles", ["NANI", "QYAN"]],
      ["chatelet+les+halles", "sucy+bonneuil", ["NANI", "NOTE", "NELY"]],
      ["maisons+laffitte", "nation", ["NANI", "NOTE", "QYAN", "QUDO"]],
      [
        "auber",
        "gare+de+lyon",
        ["NANI", "NOTE", "QIKI", "QYAN", "NELY", "QUDO"],
      ],
      [
        "charles+de+gaulle+etoile",
        "marne+la+vallee+chessy",
        ["QIKI", "QYAN", "QUDO"],
      ],
    ]).test(
      "should get missions from '%s' to '%s'",
      (departure, arrival, expectedMissions) => {
        const actualMissions = getMissions(departure, arrival);
        expect(actualMissions).toEqual(expectedMissions);
      }
    );
  });
});
