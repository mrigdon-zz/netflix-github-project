import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import LocalePicker from "../LocalePicker";

describe("LocalePicker", () => {
  it("renders the localized label with the attrs", () => {
    render(<LocalePicker />);

    fireEvent.select(screen.getByDisplayValue("English"), {
      target: { value: "es" },
    });

    expect(screen.getByDisplayValue("Español")).toBeInTheDocument();
  });
});
