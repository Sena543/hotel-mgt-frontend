import { Paper, TableContainer, TableCell, TableHead, TableRow, Table, TableBody, Typography } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";
import "./roomList.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#f1faff",
		// backgroundColor: theme.palette.common.black,
		color: "#000",
		fontWeight: "bold",
		fontSize: 16,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		// backgroundColor: theme.palette.action.hover,
		backgroundColor: "#ebecf0",
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function RoomList() {
	const tableHeadList = ["Room Name", "Bed Type", "Facility", "Status"];
	const tableData = [
		{
			roomName: "Delux B-001",
			bedType: "Double Bed",
			facility: "AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi",
			status: "Booked",
			period: "Oct 24th - 31st",
		},
		{
			roomName: "Delux B-002",
			bedType: "Double Bed",
			facility: "AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi",
			status: "Available",
			period: "Oct 24th - 31st",
		},
		{
			roomName: "Delux B-003",
			bedType: "Double Bed",
			facility: "AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi",
			status: "Booked",
			period: "Oct 24th - 31st",
		},
		{
			roomName: "Delux B-004",
			bedType: "Double Bed",
			facility: "AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi",
			status: "Pending",
			period: "Oct 24th - 31st",
		},
	];
	return (
		// <Paper className="room-list-container">
		<TableContainer component={Paper} className="room-table-container">
			<Table>
				<TableHead>
					<TableRow>
						{tableHeadList.map((name) => (
							<StyledTableCell>
								{name.toLocaleUpperCase()}
								{/* <Typography variant="h6">{name}</Typography> */}
							</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map(
						({
							roomName,
							bedType,
							facility,
							status,
							period,
						}: {
							roomName: string;
							bedType: string;
							facility: string;
							status: string;
							period: string;
						}) => (
							<StyledTableRow hover>
								<TableCell>{roomName}</TableCell>
								<TableCell>{bedType}</TableCell>
								<TableCell>{facility}</TableCell>
								<TableCell>
									<Typography
										className="available"
										style={{
											display: "grid",
											placeItems: "center",
											width: "70%",
											borderRadius: 5,
										}}
									>
										{status}
									</Typography>
									<Typography variant="caption" display="block">
										{period}
									</Typography>
								</TableCell>
							</StyledTableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
		// </Paper>
	);
}

export default RoomList;
