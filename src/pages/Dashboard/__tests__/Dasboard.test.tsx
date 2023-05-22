import { screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { renderWithProviders } from "../../../test/test-utils/redux-render-provider";
import { vi } from "vitest";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe("Dashboard Test", () => {
    it("tests if dash renders", () => {
        renderWithProviders(<Dashboard />);

        // check if App components renders headline
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Reservation Statistics")).toBeInTheDocument();
        expect(screen.getByText("Check in and Check outs Today")).toBeInTheDocument();
        expect(screen.getByText("Latest Customer Review")).toBeInTheDocument();
    });
});
