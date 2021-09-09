import React from "react";
import { create } from "react-test-renderer";
import TableHeader from "../TableHeader";

describe("TableHeader", () => {
  test("unsorted", () => {
    const output = create(
      <TableHeader
        id="test"
        label="Test"
        sorted={false}
        ascending={false}
        unsortable={false}
        onClick={jest.fn()}
      />
    );
    expect(output).toMatchSnapshot();
  });

  test("sorted", () => {
    const output = create(
      <TableHeader
        id="test"
        label="Test"
        sorted={true}
        ascending={false}
        unsortable={false}
        onClick={jest.fn()}
      />
    );
    expect(output).toMatchSnapshot();
  });

  test("ascending", () => {
    const output = create(
      <TableHeader
        id="test"
        label="Test"
        sorted={true}
        ascending={true}
        unsortable={false}
        onClick={jest.fn()}
      />
    );
    expect(output).toMatchSnapshot();
  });

  test("unsortable", () => {
    const output = create(
      <TableHeader
        id="test"
        label="Test"
        sorted={false}
        ascending={false}
        unsortable={true}
        onClick={jest.fn()}
      />
    );
    expect(output).toMatchSnapshot();
  });
});
