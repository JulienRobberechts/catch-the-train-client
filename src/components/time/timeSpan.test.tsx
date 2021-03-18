import { render } from "@testing-library/react";
import moment from "moment";
import each from "jest-each";
import TimeSpan from "./timeSpan";

describe("timeSpan", () => {
  each([
    ["-29:00:01", "J-1"],
    ["-09:00:01", "-9h00"],
    ["-01:00:01", "-1h00"],
    ["-00:47:00", "-47min"],
    ["-00:01:10", "-1min10"],
    ["-00:01:00", "-1min"],
    ["-00:00:50", "-50s"],
    ["-00:00:29", "-29s"],
    ["-00:00:01", "-1s"],
    ["00:00:00", "0s"],
    ["00:00:07", "7s"],
    ["00:00:40", "40s"],
    ["00:02:33", "2min33"],
    ["00:02:00", "2min"],
    ["01:00:00", "1h00"],
    ["01:02:33", "1h02"],
    ["15:02:33", "15h02"],
    ["25:02:33", "J+1"]
  ]).test("should display %s as %s", (durationString, expectedTextContent) => {
    const timeSpan = moment.duration(durationString);
    const { container } = render(<TimeSpan timeSpan={timeSpan} />);
    expect(container.textContent).toBe(expectedTextContent);
  });
});
