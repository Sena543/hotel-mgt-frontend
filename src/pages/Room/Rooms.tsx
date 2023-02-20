import { Container } from "@mui/material";
import { useState } from "react";
import RoomHeader from "../../components/Room/RoomHeader";
import RoomList from "../../components/Room/RoomList";

function Rooms() {
	const [selectedHeader, setSelectedHeader] = useState<string>("all");

	return (
		<Container className="room-container">
			<RoomHeader selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
			<RoomList selectedHeader={selectedHeader} />
		</Container>
	);
}

export default Rooms;
