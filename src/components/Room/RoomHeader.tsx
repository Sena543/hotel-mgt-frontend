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
		{ name: "All Rooms", value: "all" },
		{ name: "Available Rooms", value: "available" },
		{ name: "Booked Rooms", value: "booked" },
	];
	console.log(selectedHeader);
	return (
		<div className="room-header-container">
			<div className="guest-title">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Room
				</Typography>
				<Paper className="room-header-paper">
					{roomAvailabilityTypes.map(({ name, value }) => (
						<div
							onClick={() => setSelectedHeader(value)}
							key={name}
							className={`roomHeader ${selectedHeader === value ? "header-selected" : null}`}
						>
							<Typography>{name}</Typography>
						</div>
					))}
				</Paper>
			</div>
			{/* <div className="textfield-div">
				<CustomTextField
					fullWidth
					placeholder="Search here..."
					InputProps={{
						endAdornment: (
							<InputAdornment position="end" style={{ marginBottom: 15 }}>
								<SearchRounded />
							</InputAdornment>
						),
					}}
				/>
			</div> */}
			{/* <div className="schedule-div"> */}
			{/* <input id="dateInput" type="date" /> */}
			{/* <Typography variant="h6">Check schedule</Typography> */}
			{/* </div> */}
		</div>
	);
}

export default RoomHeader;
