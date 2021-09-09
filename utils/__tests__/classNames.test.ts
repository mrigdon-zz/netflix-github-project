import classNames from "../classNames";

describe("classNames", () => {
  it("joins truthy classes", () => {
    const name = classNames(
      "foo",
      false && "bar",
      null && "baz",
      true && "fighters"
    );
    expect(name).toBe("foo fighters");
  });
});
