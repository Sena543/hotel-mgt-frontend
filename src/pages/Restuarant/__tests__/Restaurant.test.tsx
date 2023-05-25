import { describe, vi } from "vitest";
import { renderWithProviders } from "../../../test/test-utils/redux-render-provider";
import Restuarant from "../Restuarant";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OrderModal from "../../../components/Restaurant/OrderModal";

function MockRestaurantRouter() {
    return (
        <BrowserRouter>
            <Restuarant />
        </BrowserRouter>
    );
}
describe("Test restaurant page", () => {
    it("test if the restuarant page renders", () => {
        renderWithProviders(<MockRestaurantRouter />);

        expect(screen.getByText("Restaurant")).toBeInTheDocument();
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /view menu/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /create guest order/i })).toBeInTheDocument();
    });
});
