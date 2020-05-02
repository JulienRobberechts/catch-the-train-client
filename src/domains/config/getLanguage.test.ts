import each from "jest-each";
import getLanguage from "./getLanguage";

describe("getLanguage", () => {
  each`
    url                                                    | expectedLanguage
    ${null}                                                | ${"unknown"}
    ${"http://localhost:3025/settings"}                    | ${"unknown"}
    ${"https://attraper-le-train.dev-app.space/settings"}  | ${"fr"}
    ${"https://catch-the-train.dev-app.space/settings"}    | ${"en"}
  `.test(
    "should identify url '$url' language $expectedLanguage",
    ({ url, expectedLanguage }) => {
      const language = getLanguage(url);
      expect(language).toEqual(expectedLanguage);
    }
  );
});
