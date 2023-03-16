import { MoreHorizRounded } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { guests } from "../../services/guests";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import Request from "../guest/Request";
import "./guest-table.css";

function GuestTable() {
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
						{guests &&
							guests.map(({ name, room, checkin, checkout, request, status }, index) => (
								<StyledTableRow hover key={`${name}${room}-${index}`}>
									<StyledTableCell>
										<Link className={"guest-name"} to={`guest_details/${name}`}>
											<Typography>{name}</Typography>
										</Link>
									</StyledTableCell>
									<StyledTableCell>{room}</StyledTableCell>
									<StyledTableCell>{checkin}</StyledTableCell>
									<StyledTableCell>{checkout}</StyledTableCell>
									<StyledTableCell>
										<IconButton onClick={() => setOpen(true)}>
											<MoreHorizRounded />
										</IconButton>
									</StyledTableCell>
									<StyledTableCell>{status}</StyledTableCell>
									<Request request={request} open={open} setOpen={setOpen} />
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default GuestTable;
