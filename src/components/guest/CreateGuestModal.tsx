import "./create-guest.css";
import { CloseRounded } from "@mui/icons-material";
import { Button, Typography, IconButton, Divider, Tooltip, TextField, Autocomplete } from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useMemo, useState } from "react";

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
		checkIn: dayjs(), //today
		checkOut: dayjs().add(1, "day"), //tomorrow
		roomAssigned: "",
	});

	const [dateError, setDateError] = useState<DateValidationError | null>(null);

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
		// console.log(value.$d);
		// console.log(new Intl.DateTimeFormat("en-GB").format(value.$d));
		// setGuestDetails({ ...guestDetails, [name]: new Intl.DateTimeFormat("en-GB").format(value.$d) });
		if (name === "checkOut") {
			if (dayjs(guestDetails.checkOut).isBefore(guestDetails.checkIn)) {
				setDateError("invalidDate");
				return;
			}
		}
		setGuestDetails({ ...guestDetails, [name]: value });
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
								// error={!guestDetails.lastName}
								// helperText="Last name is required"
								className="custom-text-field"
								label="Last Name"
								margin="normal"
								onChange={(e: any) => handleChange(e.target.name, e.target.value)}
							/>
							<CustomTextField
								name="firstName"
								variant="outlined"
								className="custom-text-field"
								label="First Name"
								// error={!guestDetails.firstName}
								// helperText="First name is required"
								value={guestDetails.firstName}
								margin="normal"
								onChange={(e: any) => handleChange(e.target.name, e.target.value)}
							/>
						</div>

						<div className="contact-div">
							<CustomTextField
								name="email"
								variant="outlined"
								className="custom-text-field contacts-field email"
								value={guestDetails.email}
								fullWidth
								// error={!guestDetails.email}
								// helperText="email is required"
								label="Email"
								margin="normal"
								onChange={(e: any) => handleChange(e.target.name, e.target.value)}
							/>
							<CustomTextField
								name="contact"
								variant="outlined"
								fullWidth
								value={guestDetails.contact}
								className="custom-text-field contacts-field phone-number"
								label="Phone Number"
								margin="normal"
								// error={!guestDetails.contact}
								// helperText="Contact is required"
								onChange={(e: any) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className="date-picker-div name-div">
							<DatePicker
								disablePast
								label="Check In Date"
								format="DD-MM-YYYY"
								value={guestDetails.checkIn}
								minDate={guestDetails.checkIn}
								onChange={(dateValue) => handleDateChange("checkIn", dateValue)}
								className="custom-text-field contacts-field"
							/>
							<DatePicker
								disablePast
								format="DD-MM-YYYY"
								label="Check Out Date"
								value={guestDetails.checkOut}
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
								className="custom-text-field contacts-field"
							/>
						</div>
						<div className="select-guest-room">
							<Autocomplete
								disablePortal
								className="auto-complete"
								id="combo-box-demo"
								// options={top100Films}
								sx={{ width: 300 }}
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
						<Button
							onClick={() => console.log(guestDetails)}
							variant="contained"
							className="create-guest-button"
						>
							Create
						</Button>
					</div>
				</div>
			</GenericModal>
		</LocalizationProvider>
	);
}

export default CreateGuestModal;
// <Modal
// 	className="modal"
// 	open={open}
// 	onClose={() => setOpenModal(false)}
// 	aria-labelledby="modal-modal-title"
// 	aria-describedby="modal-modal-description"
// >
// 	<Box className="modal-box">
// 		{/* <Box sx={style} className="modal-box"> */}
// 		<div className="guest-review-header generic-flex-justify-content-style">
// 			<Typography fontWeight={"bolder"} fontSize="25px">
// 				New Guest
// 			</Typography>
// 			<Tooltip title="Close">
// 				<IconButton onClick={() => setOpenModal(false)}>
// 					<CloseRounded />
// 				</IconButton>
// 			</Tooltip>
// 		</div>
// 		<Divider />
// 		<div className="create-guest-form">
// 			<div>
// 				<TextField name="Last Name" />
// 				<TextField name="First Name" />
// 			</div>
// 		</div>
// 	</Box>
// </Modal>
