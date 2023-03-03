import { CloseRounded } from "@mui/icons-material";
import { Button, Typography, IconButton, Divider, Tooltip, TextField, Autocomplete } from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./create-guest.css";
import { useState } from "react";

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
		checkIn: "",
		checkOut: "",
		roomAssigned: "",
	});

	const handleChange = (name: string, value: unknown) => {
		setGuestDetails((prevState: any) => {
			return { ...prevState, [name]: value };
		});
	};
	return (
		<GenericModal className="create-guest-modal-container" open={open} setOpenModal={setOpenModal}>
			<div className="guest-review-header generic-flex-justify-content-style">
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
							name="lastName"
							variant="outlined"
							value={guestDetails.lastName}
							className="custom-text-field"
							label="Last Name"
							onChange={(e) => handleChange(e.target.name, e.target.value)}
						/>
						<CustomTextField
							name="firstName"
							variant="outlined"
							className="custom-text-field"
							label="First Name"
							value={guestDetails.firstName}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
						/>
					</div>

					<div className="contact-div">
						<CustomTextField
							name="email"
							variant="outlined"
							className="custom-text-field contacts-field"
							value={guestDetails.email}
							label="Email"
							onChange={(e) => handleChange(e.target.name, e.target.value)}
						/>
						<CustomTextField
							name="contact"
							variant="outlined"
							value={guestDetails.contact}
							className="custom-text-field contacts-field"
							label="Phone Number"
							onChange={(e) => handleChange(e.target.name, e.target.value)}
						/>
					</div>
					<div className="contact-div">
						{/* <DesktopDatePicker
							label="Check In Date"
							inputFormat="DD/MM/YYYY"
							value={guestDetails.checkIn}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
							className="custom-text-field contacts-field"
							name="checkIn"
							renderInput={(params) => <TextField {...params} />}
						/>
						<DesktopDatePicker
							label="Check Out Date"
							inputFormat="DD/MM/YYYY"
							value={guestDetails.checkout}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
							className="custom-text-field contacts-field"
							name="checkOut"
							renderInput={(params) => <TextField {...params} />}
						/> */}
					</div>
					<div className="select-guest-room">
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							// options={top100Films}
							sx={{ width: 300 }}
							renderInput={(params: any) => (
								<CustomTextField
									className="custom-text-field contacts-field"
									{...params}
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
