import "./create-guest.css";
import { CloseRounded } from "@mui/icons-material";
import {
    Button,
    Typography,
    IconButton,
    Divider,
    Tooltip,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewGuest, resetGuestStatus } from "../../redux/slices/guestSlices";
import { AppDispatch } from "../../redux/types";
import { fetchAllRooms } from "../../redux/slices/roomSlicers";
import { createNewBookingHistory, resetStatus } from "../../redux/slices/bookingSlices";

type CreateModalProps = {
    open: boolean;
    setOpenModal: Function;
};

function CreateGuestModal({ setOpenModal, open }: CreateModalProps) {
    const { roomList: roomListData, status: roomLoadingStatus } = useSelector(
        (state: any) => state.rooms
    );
    const guestsList = useSelector((state: any) => state.guests.guestsData);
    const { status } = useSelector((state: any) => state.guests);
    const dispatch = useDispatch<AppDispatch>();

    const [inputValue, setInputValue] = useState("");
    const [dateError, setDateError] = useState<DateValidationError | null>(null);

    useEffect(() => {
        if (roomListData.length === 0) {
            dispatch(fetchAllRooms());
        }
    }, [dispatch]);

    const [guestDetails, setGuestDetails] = useState({
        lastName: "",
        firstName: "",
        email: "",
        contact: "",
        checkIn: dayjs(), //today
        checkOut: dayjs().add(1, "day"), //tomorrow
        roomAssigned: roomListData[0],
        specialRequests: "",
    });

    const errorMessage = useMemo(() => {
        switch (dateError) {
            // case "maxDate":
            // 	return "Check out date is in the past";
            // case "minDate": {
            // 	return "Please select a date in the first quarter of 2022";
            // }
            case "invalidDate": {
                return "Check out date should be greater than check in date";
            }

            default: {
                return "";
            }
        }
    }, [dateError]);

    const handleChange = (name: string, value: unknown) => {
        setGuestDetails((prevState: any) => {
            return { ...prevState, [name]: value };
        });
    };

    const handleDateChange = (name: string, value: any) => {
        if (name === "checkOut") {
            if (dayjs(guestDetails.checkOut).isBefore(guestDetails.checkIn)) {
                setDateError("invalidDate");
                return;
            }
        }

        setGuestDetails({
            ...guestDetails,
            [name]: value,
        });
    };

    const filterAvailable = () => {
        return (
            roomListData &&
            roomListData.filter(({ status }: { status: string }) => status === "Available")
        );
    };

    const submitGuestData = async () => {
        const newGuestData = {
            ...guestDetails,
            guestID: guestsList.length + 1,
            roomAssigned: guestDetails.roomAssigned.roomName,
            checkIn: `${guestDetails["checkIn"].get("month") + 1}-${guestDetails["checkIn"].get(
                "date"
            )}-${guestDetails["checkIn"].get("year")}`,
            checkOut: `${guestDetails["checkOut"].get("month") + 1}-${guestDetails["checkOut"].get(
                "date"
            )}-${guestDetails["checkOut"].get("year")}`,
        };

        const newBookingData = {
            bookingID: `${new Date().getTime().toString().slice(-6)}`,
            roomID: newGuestData.roomAssigned,
            checkIn: newGuestData.checkIn,
            checkOut: newGuestData.checkOut,
            guestID: newGuestData.guestID,
            mealOrderID: [],
        };
        dispatch(addNewGuest(newGuestData));
        dispatch(createNewBookingHistory(newBookingData));
        dispatch(resetStatus());
        dispatch(resetGuestStatus());

        setGuestDetails({
            lastName: "",
            firstName: "",
            email: "",
            contact: "",
            checkIn: dayjs(), //today
            checkOut: dayjs().add(1, "day"), //tomorrow
            roomAssigned: roomListData[0],
            specialRequests: "",
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GenericModal
                className="create-guest-modal-container"
                open={open}
                setOpenModal={setOpenModal}
            >
                <div style={{ padding: "auto 10px" }} className="guest-header">
                    <Typography fontWeight={"bolder"} fontSize="25px">
                        New Guest
                    </Typography>
                    <Tooltip title="Close">
                        <IconButton onClick={() => setOpenModal(false)}>
                            <CloseRounded />
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider />
                <div className="create-guest-form">
                    <div style={{}}>
                        <div className="name-div">
                            <CustomTextField
                                autoFocus
                                name="lastName"
                                variant="outlined"
                                value={guestDetails.lastName}
                                className="custom-text-field"
                                label="Last Name"
                                margin="normal"
                                onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                                // error={!guestDetails.lastName}
                                // helperText="Last name is required"
                            />
                            <CustomTextField
                                name="firstName"
                                variant="outlined"
                                className="custom-text-field"
                                label="First Name"
                                value={guestDetails.firstName}
                                margin="normal"
                                onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                                // error={!guestDetails.firstName}
                                // helperText="First name is required"
                            />
                        </div>

                        <div className="contact-div">
                            <CustomTextField
                                name="email"
                                variant="outlined"
                                className="custom-text-field contacts-field email"
                                value={guestDetails.email}
                                fullWidth
                                label="Email"
                                onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                                // error={!guestDetails.email}
                                // helperText="email is required"
                                margin="normal"
                            />
                            <CustomTextField
                                name="contact"
                                variant="outlined"
                                fullWidth
                                value={guestDetails.contact}
                                className="custom-text-field contacts-field phone-number"
                                label="Phone Number"
                                margin="normal"
                                onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                                // error={!guestDetails.contact}
                                // helperText="Contact is required"
                            />
                        </div>
                        <div className="date-picker-div">
                            <DatePicker
                                // disablePast
                                label="Check In Date"
                                format="MM-DD-YYYY"
                                // format="DD-MM-YYYY"
                                // value={dayjs(guestDetails.checkIn, "DD-MM-YYYY")}
                                value={dayjs(guestDetails.checkIn, "mm-dd-yyyy")}
                                minDate={dayjs()}
                                onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
                                className="custom-text-field contacts-field date-picker"
                                sx={{ marginTop: "2em" }}
                            />
                            <DatePicker
                                disablePast
                                format="MM-DD-YYYY"
                                label="Check Out Date"
                                value={dayjs(guestDetails.checkOut, "MM-DD-YYYY")}
                                onError={(newError) => setDateError(newError)}
                                onChange={(dateValue) => {
                                    handleDateChange("checkOut", dateValue);
                                    setDateError(null);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: errorMessage,
                                    },
                                }}
                                sx={{ marginTop: "2em" }}
                                className="custom-text-field contacts-field date-picker"
                            />
                        </div>
                        <div className="select-guest-room">
                            <Autocomplete
                                getOptionLabel={(option: any) => option.roomName}
                                options={filterAvailable()}
                                // value={guestDetails.roomAssigned}
                                onChange={(
                                    event: React.SyntheticEvent<Element, Event>,
                                    value: any
                                ) => {
                                    handleDateChange("roomAssigned", value);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option.roomName === value.roomName
                                }
                                loading={roomLoadingStatus === "loading"}
                                className="auto-complete custom-text-field contacts-field"
                                id="combo-box-demo"
                                sx={{ marginTop: "1em" }}
                                fullWidth
                                renderInput={(params: any) => (
                                    <CustomTextField
                                        className="custom-text-field contacts-field"
                                        {...params}
                                        fullWidth
                                        label="Room"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {roomLoadingStatus === "loading" ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="button-div">
                        {status === "loading" ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                // onClick={() => console.log(guestDetails)}
                                onClick={submitGuestData}
                                variant="contained"
                                className="create-guest-button"
                            >
                                Create
                            </Button>
                        )}
                    </div>
                </div>
            </GenericModal>
        </LocalizationProvider>
    );
}

export default CreateGuestModal;
// TODO
//show notification after add/error has occured
