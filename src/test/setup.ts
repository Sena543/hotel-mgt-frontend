import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { roomData } from "../services/roomList";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

const handlers = [
    rest.get(
        "https://firestore.googleapis.com/v1/projects/hotel-management-system-dev/databases/(default)/documents:runQuery",
        // "fetch/rooms",
        (req, res, ctx) => {
            return res(ctx.json(roomData), ctx.delay(150));
        }
    ),
];

const server = setupServer(...handlers);

// // Enable API mocking before tests.
beforeAll(() => {
    console.log("Before all");
    server.listen();
});

// // Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// // Disable API mocking after the tests are done.
afterAll(() => server.close());

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
