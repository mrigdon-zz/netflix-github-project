import React from "react";
import TestRenderer from "react-test-renderer";
import OrgSearchInput from "../OrgSearchInput";

describe("OrgSearchInput", () => {
  it("renders the input with a new example every 3 seconds", () => {
    jest.useFakeTimers();

    const output = TestRenderer.create(
      <OrgSearchInput search="" onSearch={jest.fn()} />
    );
    expect(output).toMatchSnapshot("before 3 seconds");

    jest.advanceTimersByTime(3000);
    expect(output).toMatchSnapshot("after 3 seconds");
  });
});
