import React from "react";
import { render } from "@testing-library/react";
import {
  withTextContent,
  notExpectInTheDocument
} from "./testing-library-react";

describe("withTextContent", () => {
  test("should detect the text content", () => {
    const Hello = () => (
      <div>
        Hello <span>world</span>
      </div>
    );
    const { queryByText } = render(<Hello />);

    // the standard method can't match it
    expect(queryByText("Hello world")).not.toBeInTheDocument();
    expect(queryByText(/Hello world/)).not.toBeInTheDocument();

    // the withTextContent method can
    expect(queryByText(withTextContent("Hello world"))).toBeInTheDocument();

    // not matching
    expect(queryByText(withTextContent("Hello You"))).not.toBeInTheDocument();
    expect(queryByText(withTextContent("Hello World"))).not.toBeInTheDocument();
    expect(
      queryByText(withTextContent("Hello  world"))
    ).not.toBeInTheDocument();
    expect(queryByText(withTextContent("Hello wor"))).not.toBeInTheDocument();
  });
});

describe("notExpectInTheDocument", () => {
  test("should succeed when there is no match", () => {
    const Hello = () => (
      <div>
        <span>hello</span>
        <span>
          world
          <span>everybody</span>
        </span>
      </div>
    );
    const { queryByText } = render(<Hello />);

    notExpectInTheDocument(queryByText, "hey", "WORLD", "every", "body");
  });
});
