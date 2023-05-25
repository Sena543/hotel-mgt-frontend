import { renderWithProviders } from "../../../test/test-utils/redux-render-provider";
import Rooms from "../Rooms";
import { render, screen } from "@testing-library/react";
import { roomData } from "../../../services/roomList";
import RoomList, { RoomInterface } from "../../../components/Room/RoomList";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
// export const handlers = [

// ];

// const server = setupServer(...handlers);

// // Enable API mocking before tests.
// beforeAll(() => server.listen());

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers());

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());

const MockRooms = ({
    selectedHeader,
    roomData,
}: {
    selectedHeader: string;
    roomData: RoomInterface[];
}) => {
    return <RoomList selectedHeader={selectedHeader} roomData={roomData} />;
};
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
