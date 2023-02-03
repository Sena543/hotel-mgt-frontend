import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Typography } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import "./table.css";
import { tableData } from "../../services/roomList";
import { StyledTableCell } from "./TableComp";

type GenericTableProps = {
	tableHeaderData: string[];
	tableBodyData: any;
	// children: any;
	// tableBodyData: StyledComponent<TableCellProps & MUIStyledCommonProps<Theme>, {}, {}>;
};

function GenericTable({ tableHeaderData, tableBodyData }: GenericTableProps) {
	return (
		<TableContainer component={Paper} elevation={0} className="room-table-container">
			<Table>
				<TableHead>
					<TableRow>
						{tableHeaderData.map((name) => (
							<StyledTableCell>{name.toLocaleUpperCase()}</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				{/* {children} */}
				{tableBodyData}
				{/* <TableBody>
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
				</TableBody> */}
			</Table>
		</TableContainer>
	);
}

export default GenericTable;
