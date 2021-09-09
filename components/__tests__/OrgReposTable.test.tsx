import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import OrgReposTable from "../OrgReposTable";

describe("OrgReposTable", () => {
  it("renders the repos", () => {
    const renderer = createRenderer();
    renderer.render(
      <OrgReposTable
        repos={[
          {
            id: 1,
            name: "eureka",
            stargazers_count: 42000,
            updated_at: "2021-09-09T15:18:56.813Z",
            html_url: "https://github.com/netflix/eureka",
            forks_count: 2400,
            default_branch: "main",
          },
        ]}
        onClick={jest.fn()}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
