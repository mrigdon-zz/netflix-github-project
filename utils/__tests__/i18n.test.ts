import { label, timestamp } from "../i18n";

describe("label", () => {
  it("returns the label for the locale", () => {
    expect(label("en", "commitsFor", { repo: "lwc" })).toBe("Commits for lwc");
  });
});

describe("timestamp", () => {
  it("returns the timestamp for the locale", () => {
    const date = new Date();
    date.setUTCFullYear(2021);
    date.setUTCMonth(1);
    date.setUTCDate(1);
    date.setUTCHours(1);
    date.setUTCMinutes(0);

    expect(timestamp("en", date.toISOString())).toBe("Jan 31, 2021, 5:00 PM");
  });
});
