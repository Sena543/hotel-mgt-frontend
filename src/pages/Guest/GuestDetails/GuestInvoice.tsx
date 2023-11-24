import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types";
import dayjs from "dayjs";
import { formattedDate } from "../../../utils/util-functions";
import { fetchTaxeData } from "../../../redux/slices/taxes";
import { fetchRestaurantMenu } from "../../../redux/slices/restaurantSlice";
import { fetchAllGuestBookingHistory } from "../../../redux/slices/bookingSlices";

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
    guestDetails: GuestsType;
};

function GuestInvoice({ open, setOpen, guestDetails }: GuestInvoice) {
    const dispatch = useDispatch<AppDispatch>();
    const guestRoomStayed = useSelector((state: RootState) =>
        state.rooms.roomList.filter((room) => {
            return room.roomName === guestDetails?.roomAssigned;
        })
    );
    const restaurantMeals = useSelector((state: RootState) => state.restaurant.restaurantMealsList);
    const taxes = useSelector((state: RootState) => state.tax.taxes);
    const guestBookingDetails = useSelector((state: RootState) =>
        state.booking.bookingHistory.filter((booking) => {
            return booking.guestID === guestDetails.guestID;
        })
    );

    useEffect(() => {
        if (taxes.length === 0) {
            dispatch(fetchTaxeData());
        }
        if (restaurantMeals.length === 0) {
            dispatch(fetchRestaurantMenu());
        }
        if (guestBookingDetails.length === 0) {
            dispatch(fetchAllGuestBookingHistory());
        }
    }, [dispatch, taxes]);
    // console.log({ guestRoomStayed, guestDetails, guestBookingDetails });
    const rows = [
        { roomNo: "1", des: "lorem ipsum", pricePerNight: 122, otherCharges: "555" },
        { roomNo: "2", des: "lorem ipsum", pricePerNight: 122, otherCharges: "555" },
    ];

    const formatForTable = () => {
        let arr: (typeof rows)[0][] = [];
        guestRoomStayed.forEach((room) => {
            let data = {
                roomNo: "2",
                des: "lorem ipsum",
                pricePerNight: 0,
                otherCharges: "555",
                // meals: [],
            };

            data.roomNo = room.roomName;
            data.des = room.facility;
            data.pricePerNight = room.price;

            arr.push(data);
        });

        return arr;
    };

    //TODO : FIX THIS ASAP - CHANGE TO USE REDUCE FOR EACH ITEM IN ARRAY
    const sum = formatForTable().map(
        (row) =>
            row.pricePerNight *
            Number(
                dayjs(formattedDate(guestDetails.checkOut)).diff(
                    formattedDate(guestDetails.checkIn),
                    "day"
                )
            )
    )[0];

    // console.log(formatForTable());
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
                                    <TableCell align="center">
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
                                {formatForTable().map((row) => (
                                    // {rows.map((row) => (
                                    <StyledTableRow key={row.roomNo}>
                                        <TableCell>{row.roomNo}</TableCell>
                                        <TableCell align="center">{row.des}</TableCell>
                                        <TableCell align="center">
                                            {/* {dayjs(formattedDate(guestDetails.checkOut))} */}
                                            {dayjs(formattedDate(guestDetails.checkOut)).diff(
                                                formattedDate(guestDetails.checkIn),
                                                "day"
                                            )}
                                        </TableCell>
                                        <TableCell align="right">{row.pricePerNight}</TableCell>
                                        <TableCell align="right">{row.otherCharges}</TableCell>
                                        <TableCell align="right">
                                            {row.pricePerNight *
                                                Number(
                                                    dayjs(
                                                        formattedDate(guestDetails.checkOut)
                                                    ).diff(
                                                        formattedDate(guestDetails.checkIn),
                                                        "day"
                                                    )
                                                )}
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={4}>Subtotal</TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            {formatForTable().map(
                                                (row) =>
                                                    row.pricePerNight *
                                                    Number(
                                                        dayjs(
                                                            formattedDate(guestDetails.checkOut)
                                                        ).diff(
                                                            formattedDate(guestDetails.checkIn),
                                                            "day"
                                                        )
                                                    )
                                            )}
                                        </Typography>
                                        {/* <Typography>{invoiceSubtotal}</Typography> */}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>Tax</TableCell>
                                    <TableCell>
                                        <TableRow>
                                            {taxes.map((tax) => (
                                                <div
                                                    key={tax.rawDocID}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Typography style={{ marginRight: "3px" }}>
                                                        {tax.name}
                                                    </Typography>{" "}
                                                    <Typography>{tax.value * 100}%</Typography>
                                                </div>
                                            ))}
                                        </TableRow>
                                    </TableCell>
                                    {/* <TableCell align="right">{123}</TableCell> */}
                                    <TableCell align="left">
                                        <TableRow>
                                            {taxes.map((tax) => (
                                                <div
                                                    key={tax.rawDocID}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Typography>{tax.value * sum}</Typography>
                                                </div>
                                            ))}
                                        </TableRow>
                                    </TableCell>
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

{
    /* {`${(0.07 * 100).toFixed(0)} %`} */
}
export default GuestInvoice;
