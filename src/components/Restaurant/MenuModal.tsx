import "./menu-modal.css";
import { CloseRounded } from "@mui/icons-material";
import {
	Typography,
	IconButton,
	Divider,
	Autocomplete,
	Button,
	Tooltip,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { useState } from "react";

type MenuModalProps = {
	open: boolean;
	setOpenModal: Function;
};

const dish_type = ["Breakfast", "Lunch", "Dinner"];

function MenuModal({ open, setOpenModal }: MenuModalProps) {
	const [menuItem, setMenuItem] = useState({
		menuType: "dish",
		dishOrBev: "",
		price: "",
		dishType: "Breakfast",
		description: "",
	});

	const handleRadioChange = (name: string, value: string) => {
		setMenuItem({ ...menuItem, [name]: value });
	};

	const submitData = () => {
		console.log(menuItem);

		// setMenuItem({
		// 	menuType: "dish",
		// 	dishOrBev: "",
		// 	price: "",
		// 	dishType: "Breakfast",
		// 	description: "",
		// });
	};
	return (
		<GenericModal className="menu-modal-container" open={open} setOpenModal={setOpenModal}>
			<div className="menu-modal-header">
				<Typography variant="h5">Add New Dish</Typography>
				<Tooltip title="Close">
					<IconButton onClick={() => setOpenModal(false)}>
						<CloseRounded />
					</IconButton>
				</Tooltip>
			</div>
			<Divider />
			<div className="dish-form">
				<div>
					<FormControl>
						<RadioGroup
							value={menuItem.menuType}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								handleRadioChange(event.target.name, event.target.value);
							}}
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="menuType"
							defaultValue={"dish"}
						>
							<FormControlLabel value="dish" control={<Radio />} label="Dishes" />
							<FormControlLabel value="beverage" control={<Radio />} label="Beverages" />
						</RadioGroup>
					</FormControl>
				</div>
				{menuItem.menuType === "dish" ? (
					<>
						<CustomTextField
							label="Meal"
							name="dishOrBev"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleRadioChange(event.target.name, event.target.value)
							}
							value={menuItem.dishOrBev}
							className="menu-modal-text-field"
						/>
						<CustomTextField
							label="Price"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleRadioChange(event.target.name, event.target.value)
							}
							name="price"
							value={menuItem.price}
							className="menu-modal-text-field"
						/>

						<div className="menu-autocomplete">
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={dish_type}
								isOptionEqualToValue={(option, value) => option === value}
								getOptionLabel={(option: string) => option}
								fullWidth
								value={menuItem.dishType}
								onChange={(event: React.SyntheticEvent<Element, Event>, value: any) =>
									handleRadioChange("dishType", value)
								}
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
					</>
				) : (
					<>
						<CustomTextField
							name="dishOrBev"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleRadioChange(event.target.name, event.target.value)
							}
							label="Beverage"
							className="menu-modal-text-field"
						/>
						<CustomTextField
							name="price"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleRadioChange(event.target.name, event.target.value)
							}
							label="Price"
							className="menu-modal-text-field"
						/>

						{/* <div className="menu-autocomplete">
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
						</div> */}
						<CustomTextField
							name="description"
							value={menuItem.description}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleRadioChange(event.target.name, event.target.value)
							}
							className="menu-modal-text-field"
							label="Description"
							rows={5}
							multiline
						/>
					</>
				)}

				<div className="button-div">
					<Button onClick={submitData} variant="contained" className="create-order-button">
						Add
					</Button>
				</div>
			</div>
		</GenericModal>
	);
}

export default MenuModal;
