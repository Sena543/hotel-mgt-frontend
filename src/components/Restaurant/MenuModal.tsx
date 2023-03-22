import "./menu-modal.css";
import { CloseRounded } from "@mui/icons-material";
import { Typography, IconButton, Divider, Autocomplete, Button, Tooltip } from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";

type MenuModalProps = {
	open: boolean;
	setOpenModal: Function;
};

const dish_type = [{ label: "Breakfast" }, { label: "Lunch" }, { label: "Dinner" }];

function MenuModal({ open, setOpenModal }: MenuModalProps) {
	return (
		<GenericModal className="menu-modal-container" open={open} setOpenModal={setOpenModal}>
			<div className="order-modal-header">
				<Typography variant="h5">Add New Dish</Typography>
				<Tooltip title="Close">
					<IconButton onClick={() => setOpenModal(false)}>
						<CloseRounded />
					</IconButton>
				</Tooltip>
			</div>
			<Divider />
			<div className="dish-form">
				<CustomTextField label="Meal" className="menu-modal-text-field" />
				<CustomTextField label="Price" className="menu-modal-text-field" />

				<div className="menu-autocomplete">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={dish_type}
						fullWidth
						className="menu-modal-text-field"
						renderInput={(params) => (
							<CustomTextField
								{...params}
								fullWidth
								className="menu-modal-text-field"
								label="Dish Type"
							/>
						)}
					/>
				</div>
				<CustomTextField className="menu-modal-text-field" label="Description" rows={5} multiline />

				<div className="button-div">
					<Button variant="contained" className="create-order-button">
						Add
					</Button>
				</div>
			</div>
		</GenericModal>
	);
}

export default MenuModal;
