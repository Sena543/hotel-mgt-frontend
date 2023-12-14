import { TableContainer, Table, TableRow, TableBody, IconButton } from "@mui/material";
import TableHead from "@mui/material/TableHead/TableHead";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { deleteTaxData } from "../../redux/slices/taxes";

function TaxTable({
    tableData,
}: {
    tableData: { name: string; value: number; rawDocID: string  }[];
}) {
    const dispatch = useDispatch<AppDispatch>();
    const header = ["Name", "Value", "Action"];

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {header &&
                            header.map((name) => (
                                <StyledTableCell key={name}>
                                    {name.toLocaleUpperCase()}
                                </StyledTableCell>
                            ))}
                        {/* {showActionCol ? <StyledTableCell>ACTIONS</StyledTableCell> : null} */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData &&
                        tableData.map(
                            ({
                                name,
                                value,
                                rawDocID,
                            }: {
                                name: string;
                                value: number;
                                rawDocID: string 
                            }) => (
                                <StyledTableRow key={`${rawDocID}-${name}`} hover>
                                    <StyledTableCell>{name}</StyledTableCell>
                                    <StyledTableCell>{`${value * 100}`}%</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            onClick={() => {
                                                dispatch(deleteTaxData(rawDocID));
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TaxTable;
