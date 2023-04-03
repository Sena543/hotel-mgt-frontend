import "./create-guest.css";
import { CleanHands, CloseRounded } from "@mui/icons-material";
import {
	Button,
	Typography,
	IconButton,
	Divider,
	Tooltip,
	TextField,
	Autocomplete,
	CircularProgress,
} from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { useMemo, useState } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { addNewGuest } from "../../redux/slices/guestSlices";
import { AppDispatch } from "../../redux/types";

type CreateModalProps = {
	open: boolean;
	setOpenModal: Function;
};

function CreateGuestModal({ setOpenModal, open }: CreateModalProps) {
	const [guestDetails, setGuestDetails] = useState({
		lastName: "",
		firstName: "",
		email: "",
		contact: "",
		// checkIn: "2023-30-3", //today
		checkIn: dayjs(), //today
		checkOut: dayjs().add(1, "day"), //tomorrow
		roomAssigned: "GR-R02",
		specialRequests: "",
	});
	const [dateError, setDateError] = useState<DateValidationError | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { status } = useSelector((state: any) => state.guests);
	console.log(status);
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

		// console.log(value);

		setGuestDetails({
			...guestDetails,
			[name]: value,
		});
	};

	const submitGuestData = async () => {
		const newGuestData = {
			...guestDetails,
			checkIn: `${guestDetails["checkIn"].get("date")}-${guestDetails["checkIn"].get("month") + 1}-${guestDetails[
				"checkIn"
			].get("year")}`,
			checkOut: `${guestDetails["checkOut"].get("date")}-${
				guestDetails["checkOut"].get("month") + 1
			}-${guestDetails["checkOut"].get("year")}`,
		};
		console.log(newGuestData);
		dispatch(addNewGuest(newGuestData));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<GenericModal className="create-guest-modal-container" open={open} setOpenModal={setOpenModal}>
				<div
					style={{ padding: "auto 10px" }}
					className="guest-review-header generic-flex-justify-content-style"
				>
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
								// margin="normal"
								onChange={(e: any) => handleChange(e.target.name, e.target.value)}
								// error={!guestDetails.contact}
								// helperText="Contact is required"
							/>
						</div>
						<div className="date-picker-div">
							<DatePicker
								// disablePast
								label="Check In Date"
								format="DD-MM-YYYY"
								value={dayjs(guestDetails.checkIn, "DD-MM-YYYY")}
								minDate={dayjs()}
								onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
								className="custom-text-field contacts-field date-picker"
								sx={{ marginTop: "2em" }}
							/>
							<DatePicker
								disablePast
								format="DD-MM-YYYY"
								label="Check Out Date"
								value={dayjs(guestDetails.checkOut, "DD-MM-YYYY")}
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
								disablePortal
								className="auto-complete"
								id="combo-box-demo"
								// options={top100Films}
								// sx={{ width: 300 }}
								sx={{ marginTop: "1em" }}
								renderInput={(params: any) => (
									<CustomTextField
										className="custom-text-field contacts-field"
										{...params}
										fullWidth
										label="Room"
									/>
								)}
								options={[]}
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
