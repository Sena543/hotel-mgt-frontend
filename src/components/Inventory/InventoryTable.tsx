import { MoreHorizRounded } from "@mui/icons-material";
import {
    IconButton,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import { Link } from "react-router-dom";

function InventoryTable() {
    const header = ["Item No", "Item Name", "Location", "Quantity Available", "Category"];
    const tableData = [
        {
            name: "Chocolate",
            itemNo: "1",
            location: "Warehouse 1 A1R4",
            quantityAvailable: "50",
            itemCategory: "Food",
        },
    ];
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
                            (
                                {
                                    itemNo,
                                    location,
                                    quantityAvailable,
                                    itemCategory,
                                    name,
                                }: {
                                    itemNo: string;
                                    location: string;
                                    quantityAvailable: string;
                                    itemCategory: string;
                                    name: string;
                                },
                                index: number
                            ) => (
                                <StyledTableRow key={`${index}`} hover>
                                    <StyledTableCell>
                                        {/* <Link
                                            to={`/${itemNo}-${name}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {itemNo}
                                        </Link> */}
                                        {itemNo}
                                    </StyledTableCell>
                                    <StyledTableCell>{name}</StyledTableCell>
                                    <StyledTableCell>{location}</StyledTableCell>
                                    <StyledTableCell>{quantityAvailable}</StyledTableCell>
                                    <StyledTableCell>{itemCategory}</StyledTableCell>
                                </StyledTableRow>
                            )
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InventoryTable;
