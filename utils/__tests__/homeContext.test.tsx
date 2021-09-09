import { useContext, useState } from "react";
import { act, create } from "react-test-renderer";
import { HomeContext, HomeParams } from "../homeContext";

function Consumer() {
  const { params, setParams } = useContext(HomeContext);
  return (
    <div>
      <button
        onClick={() =>
          setParams({ search: "foo", ascending: true, column: "updated" })
        }
      >
        change stuff
      </button>
      {JSON.stringify(params, null, 2)}
    </div>
  );
}

function Provider({ initialParams }: { initialParams: HomeParams }) {
  const [params, setParams] = useState<HomeParams>(initialParams);
  return (
    <HomeContext.Provider value={{ params, setParams }}>
      <Consumer />
    </HomeContext.Provider>
  );
}

describe("HomeContext", () => {
  it("provides context to the consumer", () => {
    const renderer = create(
      <Provider
        initialParams={{
          search: "",
          ascending: false,
          column: "stars",
        }}
      />
    );
    expect(renderer).toMatchSnapshot("before changing");

    act(() => renderer.root.findByType("button").props.onClick());

    expect(renderer).toMatchSnapshot("after changing");
  });
});
