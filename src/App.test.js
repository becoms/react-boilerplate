import { render } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // Mock `window.matchMedia(query)`
  window.matchMedia = jest.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

test("renders without crashing", () => {
  expect(() => render(<App />)).not.toThrow();
});
