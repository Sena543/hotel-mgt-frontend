import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Typography,
	IconButton,
	Tooltip,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import "./table.css";
import { guests } from "../../services/guests";
import { MoreHorizRounded } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "./TableComp";

type GenericTableProps = {
	tableData: any;
};

function GenericTable({ tableData }: GenericTableProps) {
	const header = Object.keys(tableData[0]);
	return (
		<TableContainer component={Paper} elevation={0} className="room-table-container">
			<Table>
				<TableHead>
					<TableRow>
						{header && header.map((name) => <StyledTableCell>{name.toLocaleUpperCase()}</StyledTableCell>)}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData &&
						tableData.map((data: any, index: number) => (
							<StyledTableRow key={`${data["name"]} ${index}`}>
								{/* {header.map((name, _) => {
									console.log("toLocaleLowerCase:", data?.["checkout"]);
									// console.log("toLocaleLowerCase:", data?.["checkout".toLowerCase()]);
									return (
										<StyledTableCell key={`${data["name"]}-${index}`}>
											{data[name.toLowerCase().replaceAll(/\s/g, "")]}
										</StyledTableCell>
									);
								})} */}
								{header.map((name, _) => (
									<StyledTableCell key={`${data["name"]}-${index}`}>
										{data[name.toLowerCase().replaceAll(/\s/g, "")]}
									</StyledTableCell>
								))}
							</StyledTableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default GenericTable;
