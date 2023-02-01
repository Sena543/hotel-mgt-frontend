import "./roomHeader.css";
import { Paper, Typography, InputAdornment } from "@mui/material";
import CustomTextField from "../TextInput/CustomTextField";
import { SearchRounded } from "@mui/icons-material";

function RoomHeader() {
	const roomAvailabilityTypes = ["All Rooms (50)", "Available Rooms(30)", "Booked Rooms(20)"];
	return (
		<div className="room-header-container">
			<Paper className="room-header-paper">
				{roomAvailabilityTypes.map((room) => (
					<div className="roomHeader">
						<Typography variant="h6">{room}</Typography>
					</div>
				))}
			</Paper>
			<div className="textfield-div">
				<CustomTextField
					fullWidth
					placeholder="Search here..."
					// style={{ marginLeft: 20 }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end" style={{ marginBottom: 15 }}>
								<SearchRounded />
							</InputAdornment>
						),
					}}
				/>
			</div>
			<div className="schedule-div">
				{/* <input id="dateInput" type="date" /> */}
				<Typography variant="h6">Check schedule</Typography>
			</div>
		</div>
	);
}

export default RoomHeader;
