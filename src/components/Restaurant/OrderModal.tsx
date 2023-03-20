import "./order-modal.css";
import GenericModal from "../Modal/GenericModal";
import { Autocomplete, Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import CustomTextField from "../TextInput/CustomTextField";

type OrderModalProps = {
	open: boolean;
	setOpenModal: Function;
};

const top100Films = [
	{ label: "The Shawshank Redemption", year: 1994 },
	{ label: "The Godfather", year: 1972 },
	{ label: "The Godfather: Part II", year: 1974 },
	{ label: "The Dark Knight", year: 2008 },
	{ label: "12 Angry Men", year: 1957 },
	{ label: "Schindler's List", year: 1993 },
	{ label: "Pulp Fiction", year: 1994 },
	{ label: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ label: "Goodfellas", year: 1990 },
	{ label: "The Matrix", year: 1999 },
	{ label: "Seven Samurai", year: 1954 },
	{ label: "Das Boot", year: 1981 },
	{ label: "Citizen Kane", year: 1941 },
	{ label: "North by Northwest", year: 1959 },
	{ label: "Vertigo", year: 1958 },
	{ label: "The Kid", year: 1921 },
	{ label: "Inglourious Basterds", year: 2009 },
	{ label: "Snatch", year: 2000 },
	{ label: "3 Idiots", year: 2009 },
	{ label: "Monty Python and the Holy Grail", year: 1975 },
];

function OrderModal({ open, setOpenModal }: OrderModalProps) {
	return (
		<GenericModal className="order-modal-container" open={open} setOpenModal={setOpenModal}>
			<div className="order-modal-header">
				<Typography variant="h5">Create New Order</Typography>
				<Tooltip title="Close">
					<IconButton onClick={() => setOpenModal(false)}>
						<CloseRounded />
					</IconButton>
				</Tooltip>
			</div>
			<Divider />
			<div className="new-order-form">
				<div className="guest-details-order">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={top100Films}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<CustomTextField {...params} className="custom-text-field-order-modal" label="Guest Name" />
						)}
					/>
					<CustomTextField label="Guest ID" className="custom-text-field-order-modal" />
					{/* <CustomTextField label="Room ID" /> */}
				</div>

				<div className="guest-details-order">
					<CustomTextField
						className="custom-text-field-order-modal"
						label="Room ID"
						style={{ width: "56%" }}
					/>
				</div>

				<div className="guest-details-order ">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={top100Films}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<CustomTextField {...params} className="custom-text-field-order-modal" label="Meal" />
						)}
					/>
					<CustomTextField className="custom-text-field-order-modal" label="Price" />
				</div>
				<div className="guest-details-order ">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={top100Films}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<CustomTextField {...params} className="custom-text-field-order-modal" label="Beverage" />
						)}
					/>
					<CustomTextField className="custom-text-field-order-modal" label="Price" />
				</div>
				<div className="button-div">
					<Button
						// style={{ width: "80% !important" }}
						// onClick={() => console.log(staffDetails)}
						variant="contained"
						className="create-order-button"
					>
						Create
					</Button>
				</div>
			</div>
		</GenericModal>
	);
}

export default OrderModal;
