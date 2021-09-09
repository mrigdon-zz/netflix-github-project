import {
  APIResponse,
  fetchBranches,
  fetchCommits,
  fetchRepo,
  fetchRepos,
} from "..";

function mockFetch<T>(response: APIResponse<T>) {
  const value = jest.fn(() => {
    if (response.data) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response.data),
      });
    }
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: response.error }),
    });
  });

  Object.defineProperty(globalThis, "fetch", { value, writable: true });

  return value;
}

afterEach(jest.clearAllMocks);

describe("fetchRepos", () => {
  it("calls the repos API", async () => {
    const fetch = mockFetch({ data: ["repo1"] });
    expect(await fetchRepos("netflix")).toStrictEqual({ data: ["repo1"] });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/orgs/netflix/repos",
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
  });

  it("returns the error message", async () => {
    const fetch = mockFetch({ error: "failed" });
    expect(await fetchRepos("netflix")).toEqual({ error: "failed" });
  });
});

describe("fetchRepo", () => {
  it("calls the repo API", async () => {
    const fetch = mockFetch({ data: "repo1" });
    expect(await fetchRepo("netflix", "eureka")).toStrictEqual({
      data: "repo1",
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/netflix/eureka",
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
  });
});

describe("fetchBranches", () => {
  it("calls the branches API", async () => {
    const fetch = mockFetch({ data: ["branch1"] });
    expect(await fetchBranches("netflix", "eureka")).toStrictEqual({
      data: ["branch1"],
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/netflix/eureka/branches",
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
  });
});

describe("fetchCommits", () => {
  it("calls the commits API", async () => {
    const fetch = mockFetch({ data: ["commit1"] });
    expect(await fetchCommits("netflix", "eureka", "main")).toStrictEqual({
      data: ["commit1"],
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/netflix/eureka/commits?sha=main",
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
  });
});
