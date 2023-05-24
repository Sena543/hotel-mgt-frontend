import { vi } from "vitest";
import { renderWithProviders } from "../../../test/test-utils/redux-render-provider";
import { fireEvent, render, screen } from "@testing-library/react";
import { roomData } from "../../../services/roomList";
import RoomList, { RoomInterface } from "../../../components/Room/RoomList";
import Guests from "../Guests";
import CreateGuestModal from "../../../components/guest/CreateGuestModal";

describe("Guest Page Test suit", () => {
    it("Tests if guest page  renders", () => {
        renderWithProviders(<Guests />);
        // expect(screen.getByText("Guests".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Guest List")).toBeInTheDocument();
        expect(screen.getByText("Room".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Check in".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Check out".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Requests".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Status".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Create Guest" })).toBeInTheDocument();
    });
    it("Tests test if modal opens when button is clicked", async () => {
        renderWithProviders(<Guests />);
        const create_guest_modal_button = screen.getByRole("button", { name: "Create Guest" });

        fireEvent.click(create_guest_modal_button);
        expect(screen.getByText("New Guest")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    });
    it("Tests test the create new guest modal", async () => {
        renderWithProviders(<CreateGuestModal open={true} setOpenModal={vi.fn()} />);
        screen.logTestingPlaygroundURL();
        const create_guest_button = screen.getByRole("button", { name: "Create" });
        const lastName = screen.getByLabelText("Last Name");
        const firstName = screen.getByLabelText("First Name");
        const email = screen.getByLabelText("Email");
        const phoneNumber = screen.getByLabelText("Phone Number");
        const checkInDate = screen.getByLabelText("Check In Date");
        const checkOutDate = screen.getByLabelText("Check Out Date");
        const closeIcon = screen.getByTestId("close-icon");
        const selectRoom = screen.getByLabelText("Room");

        fireEvent.change(lastName, { target: { value: "TestLastName" } });
        fireEvent.change(firstName, { target: { value: "TestFirstName" } });
        fireEvent.change(email, { target: { value: "Test@email.com" } });
        fireEvent.change(phoneNumber, { target: { value: "0987654323" } });
        fireEvent.click(selectRoom);
        fireEvent.click(screen.getByText("Deluxe B-001"));
        
        fireEvent.click(create_guest_button);
        fireEvent.click(closeIcon);
        
        expect(screen.getByText("New Guest")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    });
});
