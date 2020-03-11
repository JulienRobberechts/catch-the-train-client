import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("smoke test", () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/Attraper le train/i);
    expect(titleElement).toBeInTheDocument();
  });
});
