import { MoreHorizRounded } from "@mui/icons-material";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import { guests } from "../../services/guests";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import Request from "../guest/Request";
import "./guest-table.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { formattedDate } from "../../utils/util-functions";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

type GuestTableProps = {
    lastName: string;
    firstName: string;
    roomAssigned: string;
    checkIn: string;
    checkOut: string;
    specialRequests: string;
    status: string;
    guestID: string;
};

// function GuestTable({ guestList }: GuestTableProps[]) {
function GuestTable({ guestList }: { guestList: GuestTableProps[] }) {
    const [open, setOpen] = useState<boolean>(false);

    const headerList = ["Guest Name", "Room", "Check in", "Check out", "Requests", "Status"];

    const checkGuestStatus = (date: string) => {
        if (dayjs().isAfter(formattedDate(date))) {
            return "checkOut";
        }
    };

    const guestStatus = (checkInDate: string, checkOutDate: string) => {
        // console.log(checkInDate, checkOutDate);
        if (dayjs().isBefore(formattedDate(checkInDate))) {
            // console.log("reserved");
            return "Reserved";
        }
        if (dayjs().isBetween(formattedDate(checkInDate), formattedDate(checkOutDate))) {
            // console.log("check in");
            return "Checked In";
        }
        return "Checked Out";
    };
    // console.log(guestList);
    return (
        <div>
            {/* <GenericTable tableData={guests} showActionCol={true} /> */}
            <TableContainer component={Paper} elevation={0} className="guest-table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerList.map((name) => (
                                <StyledTableCell key={name} className={name.toLowerCase()}>
                                    <Typography variant="h6">{name.toLocaleUpperCase()}</Typography>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guestList &&
                            guestList.map(
                                (
                                    {
                                        lastName,
                                        firstName,
                                        roomAssigned,
                                        checkIn,
                                        checkOut,
                                        specialRequests,
                                        status,
                                        guestID,
                                    }: GuestTableProps,
                                    index: number
                                ) => (
                                    <StyledTableRow
                                        hover
                                        key={`${lastName}${roomAssigned}-${index}`}
                                    >
                                        <StyledTableCell>
                                            <Link
                                                className={"guest-name"}
                                                to={`guest_details/${lastName} ${firstName}/${guestID}`}
                                            >
                                                <Typography>
                                                    {lastName} {firstName}
                                                </Typography>
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell>{roomAssigned}</StyledTableCell>
                                        <StyledTableCell>{checkIn}</StyledTableCell>
                                        <StyledTableCell>{checkOut.toString()}</StyledTableCell>
                                        <StyledTableCell className="requests">
                                            <IconButton onClick={() => setOpen(true)}>
                                                <MoreHorizRounded />
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography
                                                className={`${
                                                    // checkGuestStatus(checkOut)
                                                    //     ? "checkedOut"
                                                    //     : "checkedIn"
                                                    guestStatus(checkIn, checkOut)
                                                        .toLowerCase()
                                                        .replaceAll(/\s/g, "")
                                                }`}
                                                style={{
                                                    display: "grid",
                                                    placeItems: "center",
                                                    borderRadius: 5,
                                                }}
                                            >
                                                {/* {checkGuestStatus(checkOut)
                                                    ? "Checked Out"
                                                    : "Checked In"} */}
                                                {guestStatus(checkIn, checkOut)}
                                            </Typography>
                                        </StyledTableCell>
                                        <Request
                                            request={specialRequests}
                                            open={open}
                                            setOpen={setOpen}
                                        />
                                    </StyledTableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default GuestTable;
