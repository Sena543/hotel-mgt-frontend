import { MoreHorizRounded } from "@mui/icons-material";
import { IconButton, TableBody, TableCell, Tooltip, Typography } from "@mui/material";
import { guests } from "../../services/guests";
import GenericTable from "../Table/GenericTable";
import { StyledTableRow } from "../Table/TableComp";
import GuestRequest from "./Request";

const tableBody = (
	<TableBody>
		{guests.map(
			({
				name,
				room,
				checkIn,
				status,
				checkOut,
				request,
			}: {
				room: string;
				name: string;
				status: string;
				checkIn: string;
				checkOut: string;
				request: string;
			}) => (
				<StyledTableRow hover key={name}>
					<TableCell>{name}</TableCell>
					<TableCell>{room}</TableCell>
					<TableCell>{checkIn}</TableCell>
					<TableCell>{checkOut}</TableCell>
					<TableCell>
						<Tooltip title="View guest requests">
							<IconButton>
								<MoreHorizRounded />
							</IconButton>
						</Tooltip>
						{/* <GuestRequest request={request} /> */}
					</TableCell>
					<TableCell>
						<Typography
							className={status.toLocaleLowerCase()}
							style={{
								display: "grid",
								placeItems: "center",
								borderRadius: 5,
							}}
						>
							{status}
						</Typography>
					</TableCell>
				</StyledTableRow>
			)
		)}
	</TableBody>
);

function GuestTable() {
	const tableHeader = ["Name", "Room", "Check in", "Check out", "Request", "Status"];
	return (
		<div>
			<GenericTable tableData={guests} />
			{/* <GenericTable tableHeaderData={tableHeader} tableBodyData={tableBody} /> */}
		</div>
	);
}

export default GuestTable;
