import { Paper, TableContainer, TableCell, TableHead, TableRow, Table, TableBody, Typography } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";
import "./roomList.css";
import { roomData } from "../../services/roomList";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";

function RoomList({ selectedHeader }: { selectedHeader: string }) {
	const tableHeadList = ["Room Name", "Bed Type", "Facility", "Status"];

	const filterEmployees = () => {
		//filter rooms by availability status
		if (selectedHeader === "booked") {
			return roomData.filter(({ status }: { status: string }) => status === "Booked");
		}
		if (selectedHeader === "available") {
			return roomData.filter(({ status }: { status: string }) => status === "Available");
		}
		// if (selectedHeader === "inactive") {
		// 	return roomData.filter(({ status }: { status: string }) => status === "Pending");
		// }

		return roomData;
	};

	return (
		<>
			<TableContainer component={Paper} elevation={0} className="room-table-container">
				<Table className="table">
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
						{filterEmployees().map(
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
											className={status.toLocaleLowerCase()}
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
		</>
	);
}

export default RoomList;
