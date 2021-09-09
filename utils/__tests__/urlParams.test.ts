import { setParam } from "../urlParams";

describe("urlParams", () => {
  beforeAll(() => {
    document.title = "title";
    Object.defineProperty(window, "history", {
      value: { replaceState: jest.fn() },
    });
  });

  it("sets the param when truthy", () => {
    setParam("search", "netflix");
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "title",
      "/?search=netflix"
    );
  });

  it("removes the param when falsy", () => {
    setParam("search", undefined);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "title",
      "/"
    );
  });
});
