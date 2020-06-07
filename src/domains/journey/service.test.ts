import each from "jest-each";
import { getStationBySlug } from "./service";

describe("journey services", () => {
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
