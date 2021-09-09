import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import PageLayout from "../PageLayout";

describe("PageLayout", () => {
  it("renders the page", () => {
    const renderer = createRenderer();
    renderer.render(<PageLayout locale="en">hello</PageLayout>);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
