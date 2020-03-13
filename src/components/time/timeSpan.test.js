import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";
import TimeSpan from "./timeSpan";
import {
  withTextContent,
  notExpectInTheDocument
} from "../../tests/utils/testing-library-react";

describe("timeSpan", () => {
  const span2m33 = moment.duration({
    minutes: 2,
    seconds: 33
  });

  const span1h02m33 = moment.duration({
    hours: 1,
    minutes: 2,
    seconds: 33
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
    getByText(withTextContent("1h2min"));
    notExpectInTheDocument(queryByText, "0", "00", "01", "3", "33", "m", "min");
  });
});
