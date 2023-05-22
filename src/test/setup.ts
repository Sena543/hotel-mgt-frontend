import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// const server = setupServer(...handlers)

// // Enable API mocking before tests.
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are done.
// afterAll(() => server.close())

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
