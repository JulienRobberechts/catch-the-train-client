import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";
import TimeSpan from "./timeSpan";

describe("timeSpan", () => {
  const span2m30 = moment.duration({
    minutes: 2,
    seconds: 30
  });
  test("should display 2 min 30", () => {
    const { getByText, queryByText } = render(<TimeSpan timeSpan={span2m30} />);
    expect(queryByText("0")).not.toBeInTheDocument();
    expect(queryByText("00")).not.toBeInTheDocument();
    expect(queryByText("h")).not.toBeInTheDocument();
    getByText("2");
    getByText("min");
    getByText("30");
  });
});
