import { HorizontalRuleRounded, MoreHorizRounded } from "@mui/icons-material";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";

type RestaurantTableProps = {
    tableData: any;
    showActionCol?: boolean;
    className?: string;
};

type TableData<T> = {
    [K in keyof T]: T[K];
};
function RestaurantTable({ tableData, className, showActionCol }: RestaurantTableProps) {
    const header = ["Guest ID", "Guest Name", "Dish Ordered", "Total Price"];
    const [open, setOpen] = useState(false);

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            className={`room-table-container ${className}`}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {header &&
                            header.map((name) => (
                                <StyledTableCell key={name}>
                                    {name.toLocaleUpperCase()}
                                </StyledTableCell>
                            ))}
                        {showActionCol ? <StyledTableCell>ACTIONS</StyledTableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData &&
                        tableData.map(
                            (
                                {
                                    beverageId,
                                    beveragePrice,
                                    guestId,
                                    guestName,
                                    mealId,
                                    mealPrice,
                                    roomId,
                                }: {
                                    beverageId: number;
                                    beveragePrice: number;
                                    guestId: number;
                                    guestName: string;
                                    mealId: number;
                                    mealPrice: number;
                                    roomId: string;
                                },
                                index: number
                            ) => (
                                <StyledTableRow key={`${index}`} hover>
                                    <StyledTableCell>{guestId}</StyledTableCell>
                                    <StyledTableCell>{guestName}</StyledTableCell>
                                    <StyledTableCell>
                                        <Tooltip title={"show dish ordered here"}>
                                            <MoreHorizRounded />
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell>{beveragePrice + mealPrice}</StyledTableCell>

                                    {showActionCol ? (
                                        <StyledTableCell>
                                            <IconButton onClick={() => setOpen(true)}>
                                                <MoreHorizRounded />
                                            </IconButton>
                                        </StyledTableCell>
                                    ) : null}
                                </StyledTableRow>
                            )
                        )}
                </TableBody>
            </Table>
            {/* <Request request={data["request"]} open={open} setOpen={setOpen} /> */}
        </TableContainer>
    );
}

export default RestaurantTable;
