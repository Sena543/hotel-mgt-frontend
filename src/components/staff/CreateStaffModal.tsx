import "./create-staff.css";
import { CloseRounded } from "@mui/icons-material";
import { Typography, IconButton, Divider, Tooltip, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { collection, addDoc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";

type CreateModalProps = {
	open: boolean;
	setOpenModal: Function;
};

interface StaffDetails {
	lastName: string;
	firstName: string;
	email: string;
	contact: string;
	workingDays: string[];
}

function CreateStaffModal({ setOpenModal, open }: CreateModalProps) {
	const [staffDetails, setStaffDetails] = useState<StaffDetails>({
		lastName: "",
		firstName: "",
		email: "",
		contact: "",
		workingDays: [],
	});

	const handleChange = (name: string, value: unknown) => {
		setStaffDetails((prevState: any) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleWorkingDaySelection = (label: string) => {
		let workingDays: string[] = [...staffDetails.workingDays];
		const find_inArray = workingDays.includes(label);

		if (find_inArray) {
			workingDays = workingDays.filter((day) => day !== label);
		} else {
			workingDays.push(label);
		}

		handleChange("workingDays", workingDays);
	};

	const weekDays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const renderDaysWithCheckbox = (
		<>
			{weekDays &&
				weekDays.map((day: string) => (
					<div key={day}>
						<FormControlLabel
							control={
								<Checkbox
									checked={staffDetails["workingDays"].includes(day)}
									onChange={
										(e) => handleWorkingDaySelection(day)
										// console.log(e.target.checked);
									}
								/>
							}
							label={<Typography variant="h6">{day}</Typography>}
						/>
					</div>
				))}
		</>
	);

	return (
		<GenericModal className="create-staff-modal-container" open={open} setOpenModal={setOpenModal}>
			<div style={{ padding: "auto 10px" }} className="create-staff-header generic-flex-justify-content-style">
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
			<div className=" create-staff-form">
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
