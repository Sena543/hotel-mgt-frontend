import { TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import { UserType } from "../../redux/slices/staffSlices";

type AdminTableProp = {
    tableData: UserType[];
};
function AdminTable({ tableData }: AdminTableProp) {
    const header = ["Email", "Role"];

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
                                    name,
                                    email,
                                    role,
                                }: {
                                    role: string;
                                    name: string;
                                    email: string;
                                },
                                index: number
                            ) => (
                                <StyledTableRow key={`${index}-${email}`} hover>
                                    {/* <StyledTableCell>{name}</StyledTableCell> */}
                                    <StyledTableCell>{email}</StyledTableCell>
                                    <StyledTableCell>{role}</StyledTableCell>
                                </StyledTableRow>
                            )
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminTable;
