import "@testing-library/jest-dom/extend-expect";
import fetch from "node-fetch";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}
