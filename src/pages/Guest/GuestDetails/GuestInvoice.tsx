import React from "react";
import "./invoice.css";
import GenericModal from "../../../components/Modal/GenericModal";
import {
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { GuestsType } from "../../../constants/genericTypes";

const styles = {
    headerStyle: {
        color: "white",
        // fontSize: '1.5em'
    },
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

type GuestInvoice = {
    open: boolean;
    setOpen: Function;
    guestDetails?: GuestsType;
};

function GuestInvoice({ open, setOpen, guestDetails }: GuestInvoice) {
    const rows = [
        { roomNo: "1", des: "lorem ipsum", pricePerNight: "122", otherCharges: "555" },
        { roomNo: "2", des: "lorem ipsum", pricePerNight: "122", otherCharges: "555" },
    ];

    return (
        // <div className={`invoice-container ${true ? "showInvoice" : null}`}>
            <div className={`invoice-container ${open ? "showInvoice" : null}`}>
            <div className="inv-controls">
                <div></div>
                <IconButton onClick={() => setOpen(!open)}>
                    <Close />
                </IconButton>
            </div>
            <div className="invoiceContent">
                <div className="invoice-header">
                    <div style={{ display: "grid", placeContent: "center" }}>
                        <Typography style={styles.headerStyle}>LOGO</Typography>
                    </div>
                    <div
                        style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
                    >
                        <Typography variant="h5" style={styles.headerStyle}>
                            Hotel Name
                        </Typography>
                        <Typography style={{ ...styles.headerStyle, fontSize: "12px" }}>
                            Your Business Address
                        </Typography>
                        <Typography style={{ ...styles.headerStyle, fontSize: "12px" }}>
                            City
                        </Typography>
                        <Typography style={{ ...styles.headerStyle, fontSize: "12px" }}>
                            Country
                        </Typography>

                        <Typography style={{ ...styles.headerStyle, fontSize: "12px" }}>
                            Postal Address
                        </Typography>
                    </div>
                </div>
                <div className="invoice-guest-details">
                    <div className="inv-guest-dets">
                        <Typography style={{ fontSize: "15px" }}>BILL TO:</Typography>
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                            {guestDetails?.lastName} {guestDetails?.firstName}
                        </Typography>
                        <Typography style={{ fontSize: "15px" }}>{guestDetails?.email}</Typography>
                        <Typography style={{ fontSize: "15px" }}>
                            {guestDetails?.contact}
                        </Typography>
                    </div>
                    <div className="inv-dets">
                        <Typography style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Date
                        </Typography>
                        <Typography style={{ fontSize: "15px" }}>
                            {new Intl.DateTimeFormat("en-GB").format(new Date())}
                        </Typography>
                        <Typography style={{ fontSize: "15px" }}>
                            Check in date: {guestDetails?.checkIn}
                        </Typography>
                        <Typography style={{ fontSize: "15px" }}>
                            Check out date: {guestDetails?.checkOut}
                        </Typography>
                    </div>
                </div>
                <Divider style={{ margin: "auto 3%" }} />
                <div className="invoice-body">
                    {/* <div className="invoice-items"> */}

                    {/* </div> */}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="button">Room</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="button">Description</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="button">Number of Nights</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="button">$ per Night</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="button">Other Charges</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="button">Amount</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.roomNo}>
                                        <TableCell>{row.roomNo}</TableCell>
                                        <TableCell align="right">{row.des}</TableCell>
                                        <TableCell align="right">{row.des}</TableCell>
                                        <TableCell align="right">{row.pricePerNight}</TableCell>
                                        <TableCell align="right">{row.otherCharges}</TableCell>
                                        <TableCell align="right">{123}</TableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={4}>Subtotal</TableCell>
                                    <TableCell align="right">
                                        <Typography>123</Typography>
                                        {/* <Typography>{invoiceSubtotal}</Typography> */}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>Tax</TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            {`${(0.07 * 100).toFixed(0)} %`}
                                            {/* {`${(TAX_RATE * 100).toFixed(0)} %`} */}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">{123}</TableCell>
                                </TableRow>
                                <TableRow style={{ backgroundColor: "rgba(128, 82, 157, 0.08)" }}>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell align="right">{123}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default GuestInvoice;
