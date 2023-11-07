import React from "react";
import CustomTextField from "../TextInput/CustomTextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Autocomplete, Button } from "@mui/material";

function BookingForm() {
    const roomType = ["Standard", "Premium"];
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

                    <CustomTextField label="Number of People" />

                    <DatePicker
                        // disablePast
                        label="Check In Date"
                        className="guest-booking-input-field"
                        format="MM-DD-YYYY"
                        // format="DD-MM-YYYY"
                        // value={dayjs(guestDetails.checkIn, "DD-MM-YYYY")}
                        // value={dayjs(guestDetails.checkIn, "mm-dd-yyyy")}
                        minDate={dayjs()}
                        // onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                        // className="custom-text-field contacts-field date-picker"
                        // sx={{ marginTop: "2em" }}
                    />
                    <DatePicker
                        // disablePast
                        className="guest-booking-input-field"
                        label="Check Out Date"
                        format="MM-DD-YYYY"
                        // format="DD-MM-YYYY"
                        // value={dayjs(guestDetails.checkIn, "DD-MM-YYYY")}
                        // value={dayjs(guestDetails.checkIn, "mm-dd-yyyy")}
                        minDate={dayjs()}
                        // onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                        // className="custom-text-field contacts-field date-picker"
                        // sx={{ marginTop: "2em" }}
                    />
                    <Button variant="contained">Book</Button>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default BookingForm;
