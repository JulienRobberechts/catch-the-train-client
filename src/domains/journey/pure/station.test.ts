import { getStation } from "./station";
import each from "jest-each";

const AllStations = [
  { name: "Cergy-Le-Haut", slug: "cergy+le+haut" },
  { name: "Cergy-St-Christophe", slug: "cergy+st+christophe" },
  { name: "Cergy-Prefecture", slug: "cergy+prefecture" },
  { name: "Neuville Universite", slug: "neuville+universite" },
];

describe("Station", () => {
  describe("getStation", () => {
    each([
      ["cergy+le+haut", "Cergy-Le-Haut"],
      ["cergy+prefecture", "Cergy-Prefecture"],
      ["cergy", undefined],
    ]).test("should get stations name for slug '%s'", (slug, expectedName) => {
      const station = getStation(slug, AllStations);
      expect(station?.name).toEqual(expectedName);
    });
  });
});
