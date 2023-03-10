import { styled } from "@mui/material/styles";
import { TableCell, tableCellClasses, TableRow } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		// backgroundColor: theme.palette.action.hover,
		backgroundColor: "#ebecf0",
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
