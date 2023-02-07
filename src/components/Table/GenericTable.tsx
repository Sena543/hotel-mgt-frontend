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
import Request from "../guest/Request";
import { StyledTableCell, StyledTableRow } from "./TableComp";
import { useState } from "react";

type GenericTableProps = {
	tableData: any;
	showActionCol?: boolean;
};

function GenericTable({ tableData, showActionCol }: GenericTableProps) {
	const [open, setOpen] = useState<boolean>(false);
	const header = Object.keys(tableData[0]);
	return (
		<TableContainer component={Paper} elevation={0} className="room-table-container">
			<Table>
				<TableHead>
					<TableRow>
						{header && header.map((name) => <StyledTableCell>{name.toLocaleUpperCase()}</StyledTableCell>)}
						{showActionCol ? <StyledTableCell>Actions</StyledTableCell> : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData &&
						tableData.map((data: any, index: number) => (
							<StyledTableRow key={`${data["name"]} ${index}`} hover>
								{header.map((name, _) => (
									<StyledTableCell key={`${data["name"]}-${index}`}>
										{data[name.toLowerCase().replaceAll(/\s/g, "")]}
									</StyledTableCell>
								))}
								{showActionCol ? (
									<StyledTableCell>
										<IconButton onClick={() => setOpen(true)}>
											<MoreHorizRounded />
										</IconButton>
									</StyledTableCell>
								) : null}
								<Request request={data["request"]} open={open} setOpen={setOpen} />
							</StyledTableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default GenericTable;
