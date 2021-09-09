import React from "react";
import CommitsList from "../CommitsList";
import { createRenderer } from "react-test-renderer/shallow";

describe("CommitsList", () => {
  it("renders the commits", async () => {
    const renderer = createRenderer();
    renderer.render(
      <CommitsList
        commits={[
          {
            sha: "12345",
            html_url: "https://github.com/netflix/eureka/commits/12345",
            commit: {
              message: "Merged PR #42",
              committer: {
                avatar_url: "/avatar.jpg",
              },
              author: {
                name: "Joe Smith",
                date: "2021-09-09T14:57:48.345Z",
              },
            },
          },
        ]}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
