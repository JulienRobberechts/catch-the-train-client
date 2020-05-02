import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App Page", () => {
  test("smoke test", () => {
    const { getAllByText } = render(<App />);
    getAllByText(/Attraper le train/i);
  });
});
