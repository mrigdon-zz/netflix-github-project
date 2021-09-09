import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import Home from "../../pages";

describe("Home", () => {
  it("renders home", () => {
    const renderer = createRenderer();
    renderer.render(
      <Home
        locale="en"
        homeParams={{ search: "", ascending: false, column: "stars" }}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
