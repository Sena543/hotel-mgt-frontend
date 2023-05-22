import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./App";
import { renderWithProviders } from "./test/test-utils/redux-render-provider";

describe("App Test", () => {
    test("if test setup works properly", () => {
        renderWithProviders(<App />);
        expect(screen.queryByTestId("hello")).not.toBeInTheDocument();
    });
});
