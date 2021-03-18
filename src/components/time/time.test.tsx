import { render } from "@testing-library/react";
import moment from "moment";
import each from "jest-each";
import Time from "./time";

describe("Time React component", () => {
  each`
    time                                | displaySeconds    | expectedTextContent
    ${null}                             | ${false}          | ${""}
    ${"XXX"}                            | ${false}          | ${""}
    ${"2020-03-10T09:22:30+01:00"}      | ${false}          | ${"9h22"}
    ${"2020-03-10T09:02:05+01:00"}      | ${false}          | ${"9h02"}
    ${"2020-03-10T09:00:00.500+01:00"}  | ${false}          | ${"9h00"}
    ${"2020-03-10T00:22:30+01:00"}      | ${false}          | ${"0h22"}
    ${"2020-03-10T00:02:05+01:00"}      | ${false}          | ${"0h02"}
    ${"2020-03-10T00:00:00.500+01:00"}  | ${false}          | ${"0h00"}
    ${"2020-03-10T09:22:30+01:00"}      | ${true}           | ${"9h2230"}
    ${"2020-03-10T09:02:05+01:00"}      | ${true}           | ${"9h0205"}
    ${"2020-03-10T09:00:00.500+01:00"}  | ${true}           | ${"9h0000"}
  `.test(
    "should display $time as $expectedTextContent",
    ({ time, displaySeconds, expectedTextContent }) => {
      const timeMoment = moment.parseZone(time);
      const { container } = render(
        <Time time={timeMoment} displaySeconds={displaySeconds} />
      );
      expect(container.textContent).toBe(expectedTextContent);
    }
  );
});
