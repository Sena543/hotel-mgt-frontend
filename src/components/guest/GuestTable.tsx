import { MoreHorizRounded } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import { guests } from "../../services/guests";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import Request from "../guest/Request";
import "./guest-table.css";
import dayjs from "dayjs";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

type GuestTableProps = {
	lastName: string;
	firstName: string;
	roomAssigned: string;
	checkIn: string;
	checkOut: string;
	specialRequests: string;
	status: string;
};

// function GuestTable({ guestList }: GuestTableProps[]) {
function GuestTable({ guestList }: { guestList: GuestTableProps[] }) {
	const [open, setOpen] = useState<boolean>(false);

	const headerList = ["Guest Name", "Room", "Check in", "Check out", "Requests", "Status"];

	const checkGuestStatus = (date: string) => {
		return dayjs().isAfter(dayjs(date));
	};
	// console.log(dayjs().isSameOrAfter(dayjs("1-4-2023")));
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
										roomAssigned,
										checkIn,
										checkOut,
										specialRequests,
										status,
									}: GuestTableProps,
									index: number
								) => (
									<StyledTableRow hover key={`${lastName}${roomAssigned}-${index}`}>
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
										<StyledTableCell>{roomAssigned}</StyledTableCell>
										<StyledTableCell>{checkIn}</StyledTableCell>
										<StyledTableCell>{checkOut.toString()}</StyledTableCell>
										<StyledTableCell>
											<IconButton onClick={() => setOpen(true)}>
												<MoreHorizRounded />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<Typography
												className={`${checkGuestStatus(checkOut) ? "checkedOut" : "checkedIn"}`}
												style={{
													display: "grid",
													placeItems: "center",
													borderRadius: 5,
												}}
											>
												{checkGuestStatus(checkOut) ? "Checked Out" : "Checked In"}
											</Typography>
										</StyledTableCell>
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
