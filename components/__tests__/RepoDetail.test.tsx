import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import RepoDetail from "../../pages/orgs/[org]/repos/[repo]";

describe("RepoDetail", () => {
  it("renders the branch select and commits list page", () => {
    const renderer = createRenderer();
    renderer.render(
      <RepoDetail locale="en" branch="main" org="netflix" repo="eureka" />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
