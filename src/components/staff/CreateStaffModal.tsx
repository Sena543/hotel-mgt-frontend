import "./create-staff.css";
import { CheckBox, CloseRounded } from "@mui/icons-material";
import {
	Typography,
	IconButton,
	Divider,
	Tooltip,
	Autocomplete,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";

type CreateModalProps = {
	open: boolean;
	setOpenModal: Function;
};

function CreateStaffModal({ setOpenModal, open }: CreateModalProps) {
	const [staffDetails, setStaffDetails] = useState({
		lastName: "",
		firstName: "",
		email: "",
		contact: "",
		workingDays: [],
	});

	const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const handleWorkingDaySelection = (isChecked: boolean, label: string) => {
		let workingDays = [...staffDetails.workingDays];
        // const find_inArray = workingDays.includes(label)
        // if (find_inArray && isChecked) workingDays.push(label);
	};

	const renderDaysWithCheckbox = (
		<>
			{weekDays &&
				weekDays.map((day) => (
					<div>
						<FormControlLabel
							control={
								<Checkbox
									onChange={(e) => {
										console.log(e.target.checked);
									}}
								/>
							}
							label={day}
						/>
					</div>
				))}
		</>
	);

	const handleChange = (name: string, value: unknown) => {
		setStaffDetails((prevState: any) => {
			return { ...prevState, [name]: value };
		});
	};
	return (
		<GenericModal className="create-staff-modal-container" open={open} setOpenModal={setOpenModal}>
			<div style={{ padding: "auto 10px" }} className="guest-review-header generic-flex-justify-content-style">
				<Typography fontWeight={"bolder"} fontSize="25px">
					New Staff
				</Typography>
				<Tooltip title="Close">
					<IconButton onClick={() => setOpenModal(false)}>
						<CloseRounded />
					</IconButton>
				</Tooltip>
			</div>
			<Divider />
			<div className="create-guest-form create-staff-form">
				<div style={{}}>
					<div className="name-div">
						<CustomTextField
							autoFocus
							name="lastName"
							variant="outlined"
							value={staffDetails.lastName}
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
							value={staffDetails.firstName}
							margin="normal"
							onChange={(e: any) => handleChange(e.target.name, e.target.value)}
						/>
					</div>

					<div className="contact-div">
						<CustomTextField
							name="email"
							variant="outlined"
							className="custom-text-field contacts-field email"
							value={staffDetails.email}
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
							value={staffDetails.contact}
							className="custom-text-field contacts-field phone-number"
							label="Phone Number"
							margin="normal"
							// error={!guestDetails.contact}
							// helperText="Contact is required"
							onChange={(e: any) => handleChange(e.target.name, e.target.value)}
						/>
					</div>

					<div className="select-working-days">
						{/* <div className="working-days"> */}
						<FormGroup row className="working-days">
							{renderDaysWithCheckbox}
						</FormGroup>
						{/* </div> */}
					</div>
				</div>
				<div className="button-div">
					<Button
						onClick={() => console.log(staffDetails)}
						variant="contained"
						className="create-guest-button"
					>
						Create
					</Button>
				</div>
			</div>
		</GenericModal>
	);
}

export default CreateStaffModal;
