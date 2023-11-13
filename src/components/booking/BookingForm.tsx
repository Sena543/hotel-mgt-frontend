import React, { useState } from "react";
import CustomTextField from "../TextInput/CustomTextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Autocomplete, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BookingForm() {
    const navigate = useNavigate();
    const roomType = ["Standard", "Premium"];
    const [booking, setBooking] = useState({
        lastName: "",
        firstName: "",
        email: "",
        contact: "",
        checkIn: dayjs(), //today
        checkOut: dayjs().add(1, "day"), //tomorrow
        roomAssigned: "",
    });
    const [dateError, setDateError] = useState("");

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
                        sx={{ width: 250 }}
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

                    <DatePicker
                        // disablePast
                        label="Check In Date"
                        className="guest-booking-input-field"
                        format="DD-MM-YYYY"
                        value={dayjs(booking.checkIn, "DD-MM-YYYY")}
                        // format="MM-DD-YYYY"
                        // value={dayjs(booking.checkIn, "mm-dd-yyyy")}
                        minDate={dayjs()}
                        onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                        // className="custom-text-field contacts-field date-picker"
                        // sx={{ marginTop: "2em" }}
                    />
                    <DatePicker
                        // disablePast
                        className="guest-booking-input-field"
                        label="Check Out Date"
                        format="DD-MM-YYYY"
                        value={dayjs(booking.checkOut, "DD-MM-YYYY")}
                        // format="MM-DD-YYYY"
                        // value={dayjs(booking.checkIn, "mm-dd-yyyy")}
                        minDate={dayjs()}
                        onChange={(dateValue) => handleDateChange("checkOut", dateValue)}
                        // className="custom-text-field contacts-field date-picker"
                        // sx={{ marginTop: "2em" }}
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
