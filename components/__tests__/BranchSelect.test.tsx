import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import BranchSelect from "../BranchSelect";
import { rest } from "msw";

describe("BranchSelect", () => {
  const server = setupServer(
    rest.get(
      "https://api.github.com/repos/netflix/eureka/branches",
      (_, res, ctx) => res(ctx.json([{ name: "main" }, { name: "develop" }]))
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders a select", async () => {
    render(
      <BranchSelect
        org="netflix"
        repo="eureka"
        value="main"
        onSelect={jest.fn()}
      />
    );

    // initially main is selected
    expect(screen.getByDisplayValue("main")).toBeInTheDocument();

    // wait for the API call to return more
    await waitFor(() => screen.getByText("develop"));

    // select develop
    fireEvent.select(screen.getByDisplayValue("main"), {
      target: { value: "develop" },
    });

    // now develop is selected
    expect(screen.getByDisplayValue("develop")).toBeInTheDocument();
  });
});
