import "./roomHeader.css";
import { Paper, Typography, InputAdornment } from "@mui/material";
import CustomTextField from "../TextInput/CustomTextField";
import { SearchRounded } from "@mui/icons-material";

type RoomHeaderProps = {
	selectedHeader: string;
	setSelectedHeader: Function;
};

function RoomHeader({ selectedHeader, setSelectedHeader }: RoomHeaderProps) {
	const roomAvailabilityTypes = [
		{ name: "All Rooms (50)", value: "all" },
		{ name: "Available Rooms(30)", value: "available" },
		{ name: "Booked Rooms(20)", value: "booked" },
	];
	return (
		<div className="room-header-container">
			<Paper className="room-header-paper">
				{roomAvailabilityTypes.map(({ name, value }) => (
					<div onClick={() => setSelectedHeader(value)} key={name} className="roomHeader">
						<Typography variant="h6">{name}</Typography>
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
