import { renderWithProviders } from "../../../test/test-utils/redux-render-provider";
import Rooms from "../Rooms";
import { render, screen } from "@testing-library/react";
import { roomData } from "../../../services/roomList";
import RoomList, { RoomType } from "../../../components/Room/RoomList";

describe("Room Test suit", () => {
    it("Tests if room page renders", () => {
        renderWithProviders(<Rooms />);
        expect(screen.getByText("Room")).toBeInTheDocument();
        expect(screen.getByText("All Rooms")).toBeInTheDocument();
        expect(screen.getByText("Available Rooms")).toBeInTheDocument();
        expect(screen.getByText("Booked Rooms")).toBeInTheDocument();
    });
    it("Tests if table renders data", async () => {
        render(<RoomList selectedHeader="all" roomData={roomData} />);
        // renderWithProviders(<MockRooms selectedHeader="all" roomData={roomData} />);
        expect(screen.getByText("Room Name".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Bed Type".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Facility".toLocaleUpperCase())).toBeInTheDocument();
        expect(screen.getByText("Status".toLocaleUpperCase())).toBeInTheDocument();

        expect(await screen.findByText(/Delux B-001/i)).toBeInTheDocument();
    });
});
