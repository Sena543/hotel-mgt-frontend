import React, { useEffect, useState } from "react";
import CustomTextField from "../TextInput/CustomTextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Autocomplete, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types";
import { fetchAllRooms } from "../../redux/slices/roomSlicers";
import { RoomType } from "../Room/RoomList";

function BookingForm() {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const roomType = ["Deluxe", "Luxury", "Guest", "Single"];
    const [booking, setBooking] = useState({
        lastName: "",
        firstName: "",
        email: "",
        contact: "",
        checkIn: dayjs(), //today
        checkOut: dayjs().add(1, "day"), //tomorrow
        roomSelected: { roomName: "" } as RoomType,
        roomType: "",
        numberOfPeople: 0,
    });
    const [dateError, setDateError] = useState("");
    const availableRooms = useSelector((state: RootState) =>
        state.rooms.roomList.filter(
            ({ status, roomCapacity }) =>
                status === "Available" && roomCapacity >= booking.numberOfPeople
        )
    );

    useEffect(() => {
        if (availableRooms.length === 0) {
            dispatch(fetchAllRooms());
        }
    }, [dispatch, booking]);

    const handleDateChange = (name: string, value: any) => {
        if (name === "checkOut") {
            if (dayjs(booking.checkOut).isBefore(booking.checkIn)) {
                setDateError("invalidDate");
                return;
            }
        }

        setBooking({
            ...booking,
            [name]: value,
        });
    };

    // console.log(availableRooms);

    const handleChange = (name: string, value: unknown) => {
        setBooking((prevState: any) => {
            return { ...prevState, [name]: value };
        });
    };

    const handleBooking = () => {};
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="booking-form">
                <div className="guest-booking-form">
                    <Autocomplete
                        className="guest-booking-input-field"
                        disablePortal
                        id="combo-box-demo"
                        sx={{ width: 250, margin: 2 }}
                        value={booking.roomType}
                        onChange={(event: any, newValue: string | "" | null) => {
                            setBooking((prev: any) => {
                                return {
                                    ...prev,
                                    roomType: newValue,
                                };
                            });
                        }}
                        renderInput={(params) => (
                            <CustomTextField style={{}} {...params} label="Room Type" />
                        )}
                        options={roomType}
                    />

                    <CustomTextField
                        label="Number of People"
                        name="numberOfPeople"
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                    <Autocomplete
                        className="guest-booking-input-field"
                        disablePortal
                        loading={availableRooms.length === 0}
                        id="combo-box-demo"
                        sx={{ width: 250, margin: 2 }}
                        value={booking.roomSelected}
                        onChange={(event: any, newValue: RoomType | null) => {
                            setBooking((prev: any) => {
                                return {
                                    ...prev,
                                    roomSelected: newValue,
                                };
                            });
                        }}
                        options={availableRooms}
                        isOptionEqualToValue={(option, value) => option.roomName === value.roomName}
                        getOptionLabel={(option) => option.roomName}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                name="roomSelected"
                                label="Available Rooms"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {availableRooms.length === 0 ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />

                    <DatePicker
                        disablePast
                        label="Check In Date"
                        className="guest-booking-input-field"
                        format="DD-MM-YYYY"
                        value={dayjs(booking.checkIn, "DD-MM-YYYY")}
                        // format="MM-DD-YYYY"
                        // value={dayjs(booking.checkIn, "mm-dd-yyyy")}
                        minDate={dayjs()}
                        onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                        // className="custom-text-field contacts-field date-picker"
                        sx={{ margin: 2 }}
                    />
                    <DatePicker
                        disablePast
                        className="guest-booking-input-field"
                        label="Check Out Date"
                        format="DD-MM-YYYY"
                        value={dayjs(booking.checkOut, "DD-MM-YYYY")}
                        // format="MM-DD-YYYY"
                        // value={dayjs(booking.checkIn, "mm-dd-yyyy")}
                        minDate={dayjs()}
                        onChange={(dateValue) => handleDateChange("checkOut", dateValue)}
                        // className="custom-text-field contacts-field date-picker"
                        sx={{ margin: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate("/sign-up", { state: booking });
                        }}
                    >
                        Book
                    </Button>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default BookingForm;
