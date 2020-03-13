import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";
import TimeSpan from "./timeSpan";
import {
  withTextContent,
  notExpectInTheDocument
} from "../../tests/utils/testing-library-react";

describe("timeSpan", () => {
  const span7s = moment.duration({
    seconds: 7
  });

  const span40s = moment.duration({
    seconds: 40
  });

  const span2m33 = moment.duration({
    minutes: 2,
    seconds: 33
  });

  const span1h02m33 = moment.duration({
    hours: 1,
    minutes: 2,
    seconds: 33
  });

  test("should display 7 s", () => {
    const { getByText, queryByText } = render(<TimeSpan timeSpan={span7s} />);
    getByText(withTextContent("7s"));
    notExpectInTheDocument(
      queryByText,
      "0",
      "00",
      "h",
      "H",
      "m",
      "min",
      "mins",
      "07"
    );
  });

  test("should display 40 s", () => {
    const { getByText, queryByText } = render(<TimeSpan timeSpan={span40s} />);
    getByText(withTextContent("40s"));
    notExpectInTheDocument(
      queryByText,
      "0",
      "00",
      "h",
      "H",
      "m",
      "min",
      "mins"
    );
  });

  test("should display 2 min 33", () => {
    const { getByText, queryByText } = render(<TimeSpan timeSpan={span2m33} />);
    getByText(withTextContent("2min33s"));
    notExpectInTheDocument(queryByText, "0", "00", "02", "h", "H");
  });

  test("should display 2 min 33", () => {
    const { getByText, queryByText } = render(<TimeSpan timeSpan={span2m33} />);
    getByText(withTextContent("2min33s"));
    notExpectInTheDocument(queryByText, "0", "00", "02", "h", "H");
  });

  test("should display 1h 2 min 33", () => {
    const { getByText, queryByText } = render(
      <TimeSpan timeSpan={span1h02m33} />
    );
    getByText(withTextContent("1h02min"));
    notExpectInTheDocument(
      queryByText,
      "0",
      "00",
      "01",
      "3",
      "33",
      "m",
      "mins"
    );
  });
});
