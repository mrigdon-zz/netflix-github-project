import React from "react";
import { render, screen } from "@testing-library/react";
import BranchSelect from "../BranchSelect";

describe("BranchSelect", () => {
  it("renders a select", () => {
    render(<BranchSelect value="main" onSelect={jest.fn()} />);
    const select = screen.getByDisplayValue("main");
    expect(select).toBeInTheDocument();
  });
});
