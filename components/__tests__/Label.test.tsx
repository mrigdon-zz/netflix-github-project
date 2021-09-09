import React from "react";
import TestRenderer from "react-test-renderer";
import { LocaleContext } from "../../utils/i18n";
import Label from "../Label";

describe("Label", () => {
  it("renders the localized label with the attrs", () => {
    const output = TestRenderer.create(
      <Label name="commitsFor" attrs={{ repo: "eureka" }} />
    );
    expect(output).toMatchSnapshot("english");

    const output2 = TestRenderer.create(
      <LocaleContext.Provider value={{ locale: "es", setLocale: () => {} }}>
        <Label name="commitsFor" attrs={{ repo: "eureka" }} />
      </LocaleContext.Provider>
    );
    expect(output2).toMatchSnapshot("spanish");
  });
});
