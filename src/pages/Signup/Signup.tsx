import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton, Button, Typography } from "@mui/material";
import CustomTextField from "../../components/TextInput/CustomTextField";
import "./signup.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createNewBookingHistory, resetStatus } from "../../redux/slices/bookingSlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { addNewGuest, resetGuestStatus } from "../../redux/slices/guestSlices";

function Signup() {
    const { state } = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    // const [state, dispatch] = useReducer(signUpUserReducerFunction, companyDetailsState);
    const [guestSignUpDetails, setGuestSignUpDetails] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        // roomSelected: state.
        numberOfPeople: state.numberOfPeople,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        roomSelected: state.roomSelected,
    });

    // console.log(state, new Date(state.checkIn).toLocaleDateString("en-GB"));
    console.log(state);
    const handleChangeEvent = (name: string, value: string) => {
        setGuestSignUpDetails((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    // console.log(guestSignUpDetails);
    const handleClickshowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleCreateReservation = () => {
        // console.log(state, new Date(state.checkIn).toLocaleDateString("en-GB"));
        let guestID = (Math.random() * Number(new Date().getTime().toString().slice(-6)))
            .toString()
            .replace(".", "")
            .slice(6);
        const newBookingData = {
            bookingID: `${new Date().getTime().toString().slice(-6)}`,
            roomID: guestSignUpDetails.roomSelected.roomName,
            checkIn: new Date(guestSignUpDetails.checkIn).toLocaleDateString("en-GB"),
            checkOut: new Date(guestSignUpDetails.checkOut).toLocaleDateString("en-GB"),
            guestID: `${guestID}`,
            mealOrderID: [],
        };
        const newGuestData = {
            lastName: guestSignUpDetails.lastName,
            firstName: guestSignUpDetails.firstName,
            email: guestSignUpDetails.email,
            contact: guestSignUpDetails.phoneNumber,
            checkIn: new Date(guestSignUpDetails.checkIn).toLocaleDateString("en-GB"),
            checkOut: new Date(guestSignUpDetails.checkOut).toLocaleDateString("en-GB"),
            roomAssigned: guestSignUpDetails.roomSelected.roomName,
            specialRequests: "",
        };

        console.log({ newBookingData, newGuestData });
        dispatch(addNewGuest(newGuestData));
        dispatch(createNewBookingHistory(newBookingData));
        dispatch(resetStatus());
        dispatch(resetGuestStatus());
    };

    const textFieldNames = [
        { name: "Last Name", fieldName: "lastName" },
        { name: "First Name", fieldName: "firstName" },
        { name: "Email", fieldName: "email" },
        { name: "Phone Number", fieldName: "phoneNumber" },
        { name: "Number of People", fieldName: "numberOfPeople" },
    ];
    return (
        <div className="signup-layout">
            <div className="left-image-div">
                <img
                    src="https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="left-image"
                />
            </div>
            <div className="signup-root-div">
                <div>
                    <Typography variant="h1" style={{ color: "#80529d" }}>
                        Sign Up
                    </Typography>
                </div>
                <div className="signup-form">
                    {textFieldNames.map(({ fieldName, name }) => (
                        <CustomTextField
                            // autoFocus
                            key={fieldName}
                            name={fieldName}
                            variant="outlined"
                            value={guestSignUpDetails[fieldName as keyof typeof guestSignUpDetails]}
                            className="custom-signup-text-field"
                            label={name}
                            margin="normal"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                            ) => handleChangeEvent(e.target.name, e.target.value)}
                        />
                    ))}
                    <CustomTextField
                        name="password"
                        variant="outlined"
                        className="custom-signup-text-field"
                        label="Password"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickshowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            label="Check In Date"
                            // format="MM-DD-YYYY"
                            format="DD-MM-YYYY"
                            value={dayjs(state.checkIn, "DD-MM-YYYY")}
                            minDate={dayjs()}
                            // onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                            // className="custom-text-field contacts-field date-picker"
                            sx={{ margin: "1em auto", width: "100%" }}
                        />
                        <DatePicker
                            disablePast
                            // disabled
                            // className="guest-booking-input-field"
                            label="Check Out Date"
                            format="DD-MM-YYYY"
                            value={dayjs(state.checkOut, "DD-MM-YYYY")}
                            minDate={dayjs()}
                            // onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                            // className="custom-text-field contacts-field date-picker"
                            sx={{ margin: "1em auto", width: "100%" }}
                        />
                    </LocalizationProvider>
                    <Button
                        variant="contained"
                        onClick={handleCreateReservation}
                        // onClick={() => console.log(guestSignUpDetails)}
                        className="login-button"
                    >
                        Make Reservation{" "}
                    </Button>
                </div>

                <div>
                    Got an account?{" "}
                    <Link style={{ textDecoration: "none", color: "#80529d" }} to={"/sign-in"}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
