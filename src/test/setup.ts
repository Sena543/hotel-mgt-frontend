import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { roomData } from "../services/roomList";

expect.extend(matchers);

const handlers = [
    rest.get(
        // "localhost:4000/firestore",
        "http://localhost:4000/firestore/data/rooms/",
        // "http://localhost:4000/v1/projects/hotel-management-system-dev/databases/(default)/documents",
        (req, res, ctx) => {
            console.log("Get Req", req);
            return res(ctx.json(roomData), ctx.delay(150));
        }
    ),
    rest.post(
        // "localhost:4000/firestore",
        "fetch/rooms",
        (req, res, ctx) => {
            console.log("Post Req", req);
            return res(ctx.json(roomData), ctx.delay(150));
        }
    ),
    rest.get(
        "fetch/guests",
        // "localhost:4000/firestore",
        // "http://localhost:4000/firestore/data/rooms/",
        (req, res, ctx) => {
            console.log("Get Req", req);
            return res(ctx.json(roomData), ctx.delay(150));
        }
    ),
    rest.post("post/new-guests", (req, res, ctx) => {
        console.log("Post Req", req);
        return res(ctx.json(roomData), ctx.delay(150));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => {
    console.log("Before all");
    server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

afterEach(() => {
    cleanup();
});
