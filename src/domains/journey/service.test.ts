import each from "jest-each";
import { getMissions, getMissionsSchedules, getStationBySlug } from "./service";

describe("journey services", () => {
  describe("getMissionsSchedules", () => {
    test("should get Missions Schedules", () => {
      const missionsSchedules = getMissionsSchedules();
      expect(missionsSchedules).toMatchSnapshot();
    });
  });

  describe("getMissions", () => {
    each([
      ["cergy+prefecture", "houilles", ["NANI", "QYAN", "NATO", "QYLT"]],
      [
        "chatelet+les+halles",
        "sucy+bonneuil",
        ["NANI", "NOTE", "NATO", "NELY", "NEMO"],
      ],
    ]).test(
      "should get missions from '%s' to '%s'",
      (departure, arrival, expectedMissions) => {
        const actualMissions = getMissions(departure, arrival);
        expect(actualMissions.sort()).toEqual(expectedMissions.sort());
      }
    );
  });

  describe("getStationBySlug", () => {
    each([
      ["neuville+universite", "Neuville Universite"],
      ["cergy+le+haut", "Cergy-Le-Haut"],
      ["xxx", undefined],
    ]).test("should get station name for '%s'", (slug, expectedName) => {
      const station = getStationBySlug(slug);
      expect(station?.name).toEqual(expectedName);
    });
  });
});
