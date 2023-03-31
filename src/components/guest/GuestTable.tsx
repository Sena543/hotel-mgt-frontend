import { MoreHorizRounded } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import { guests } from "../../services/guests";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import Request from "../guest/Request";
import "./guest-table.css";
import dayjs from "dayjs";
type GuestTableProps = {
	lastName: string;
	firstName: string;
	roomID: string;
	checkIn: string;
	checkOut: string;
	specialRequests: string;
	status: string;
};

// function GuestTable({ guestList }: GuestTableProps[]) {
function GuestTable({ guestList }: { guestList: GuestTableProps[] }) {
	const [open, setOpen] = useState<boolean>(false);

	const headerList = ["Guest Name", "Room", "Check in", "Check out", "Requests", "Status"];

	return (
		<div>
			{/* <GenericTable tableData={guests} showActionCol={true} /> */}
			<TableContainer component={Paper} elevation={0} className="guest-table-container">
				<Table>
					<TableHead>
						<TableRow>
							{headerList.map((name) => (
								<StyledTableCell key={name}>
									<Typography variant="h6">{name.toLocaleUpperCase()}</Typography>
								</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{guestList &&
							guestList.map(
								(
									{
										lastName,
										firstName,
										roomID,
										checkIn,
										checkOut,
										specialRequests,
										status,
									}: GuestTableProps,
									index: number
								) => (
									<StyledTableRow hover key={`${lastName}${roomID}-${index}`}>
										<StyledTableCell>
											<Link
												className={"guest-name"}
												to={`guest_details/${lastName} ${firstName}`}
											>
												<Typography>
													{lastName} {firstName}
												</Typography>
											</Link>
										</StyledTableCell>
										<StyledTableCell>{roomID}</StyledTableCell>
										<StyledTableCell>{checkIn}</StyledTableCell>
										<StyledTableCell>{checkOut.toString()}</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => setOpen(true)}>
												<MoreHorizRounded />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>{status}</StyledTableCell>
										<Request request={specialRequests} open={open} setOpen={setOpen} />
									</StyledTableRow>
								)
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default GuestTable;
