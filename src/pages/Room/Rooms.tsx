import { Container } from "@mui/material";
import RoomHeader from "../../components/Room/RoomHeader";
import RoomList from "../../components/Room/RoomList";

function Rooms() {
	return (
		<Container className="room-container">
			<RoomHeader />
			<RoomList />
		</Container>
	);
}

export default Rooms;
