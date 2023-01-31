import "./roomHeader.css";
import { Paper, Typography } from "@mui/material";

function RoomHeader() {
	const roomAvailabilityTypes = ["All Rooms (50)", "Available Rooms(30)", "Booked Rooms(20)"];
	return (
		<Paper className="room-header-paper">
			{roomAvailabilityTypes.map((room) => (
				<div className="roomHeader">
					<Typography variant="h6">{room}</Typography>
				</div>
			))}
		</Paper>
	);
}

export default RoomHeader;
