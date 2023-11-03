import {
    Paper,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Table,
    TableBody,
    Typography,
} from "@mui/material";

import "./roomList.css";
// import { roomData } from "../../services/roomList";
import { StyledTableCell, StyledTableRow } from "../Table/TableComp";
import { Link } from "react-router-dom";

export type RoomType = {
    roomName: string;
    bedType: string;
    facility: string;
    status: string;
    rawDocID: string;
    // status: "Booked" | "Available";
    // period: string;
};

function RoomList({ selectedHeader, roomData }: { selectedHeader: string; roomData: RoomType[] }) {
    const tableHeadList = ["Room Name", "Bed Type", "Facility", "Status"];

    const filterRooms = () => {
        //filter rooms by availability status
        if (selectedHeader === "booked") {
            return roomData.filter(({ status }: { status: string }) => status === "Booked");
        }
        if (selectedHeader === "available") {
            return roomData.filter(({ status }: { status: string }) => status === "Available");
        }

        return roomData;
    };

    return (
        <>
            <TableContainer component={Paper} elevation={0} className="room-table-container">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            {tableHeadList.map((name) => (
                                <StyledTableCell key={name}>
                                    {name.toLocaleUpperCase()}
                                    {/* <Typography variant="h6">{name.toLocaleUpperCase()}</Typography> */}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterRooms()
                            .slice()
                            .sort((a, b) =>
                                a.roomName > b.roomName ? 1 : b.roomName > a.roomName ? -1 : 0
                            )
                            .map(({ roomName, bedType, facility, status, rawDocID }) => (
                                <StyledTableRow hover key={rawDocID}>
                                    <TableCell>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/rooms/roomdetails/${roomName}`}
                                        >
                                            <Typography>{roomName}</Typography>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{bedType}</TableCell>
                                    <TableCell>{facility}</TableCell>
                                    <TableCell>
                                        <Typography
                                            className={`${status && status.toLocaleLowerCase()}`}
                                            style={{
                                                display: "grid",
                                                placeItems: "center",
                                                width: "70%",
                                                borderRadius: 5,
                                            }}
                                        >
                                            {status}
                                        </Typography>
                                        {/* <Typography variant="caption" display="block">
											{period}
										</Typography> */}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default RoomList;
