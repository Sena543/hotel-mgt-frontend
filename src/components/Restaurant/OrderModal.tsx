import "./order-modal.css";
import GenericModal from "../Modal/GenericModal";
import { Autocomplete, Button, CircularProgress, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import CustomTextField from "../TextInput/CustomTextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "../../redux/slices/guestSlices";
import { AppDispatch } from "../../redux/types";
import { useEffect, useState } from "react";
import { fetchRestaurantMenu } from "../../redux/slices/restaurantSlice";

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
	const [guestOrder, setGuestOrder] = useState({
		guestId: "",
		guestName: "",
		roomId: "",
		mealId: "",
		beverageId: "",
		mealprice: 0,
		beveragePrice: 0,
	});

	const dispatch = useDispatch<AppDispatch>();
	const { guestsData } = useSelector((state: any) => state.guests);
	const { restaurantMealsList } = useSelector((state: any) => state.restaurant);

	useEffect(() => {
		if (!guestsData.length) {
			dispatch(fetchGuests());
		}
		if (!restaurantMealsList.length) {
			dispatch(fetchRestaurantMenu());
		}
	}, [dispatch]);

	const beverages = restaurantMealsList.filter(({ menuType }: { menuType: string }) => menuType === "beverage");
	const meals = restaurantMealsList.filter(({ menuType }: { menuType: string }) => menuType === "dish");

	const guestDetailHanlder = (selectedData: any) => {
		// const guestRoomId = guestsData.filter(({lastName, firstName})=>)
		setGuestOrder((prevState) => ({
			...prevState,
			guestId: selectedData.guestID,
			guestName: `${selectedData.firstName} ${selectedData.lastName}`,
			roomId: "",
		}));
	};

	const dishPriceHandler = (name: string, value: any) => {
		setGuestOrder((prevState) => ({ ...prevState, [name]: Number(value) }));
	};
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
						loading={guestsData && guestsData.length === 0}
						// isOptionEqualToValue={(option, value) => option.firstName=== value.guestName.split('')[0]}
						getOptionLabel={(option: any) => `${option.firstName} ${option.lastName}`}
						id="combo-box-demo"
						options={guestsData}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<CustomTextField
								{...params}
								label="Guest Name"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<>
											{guestsData && guestsData.length === 0 ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</>
									),
								}}
							/>
						)}
					/>
					<CustomTextField
						value={guestOrder.guestId}
						label="Guest ID"
						className="custom-text-field-order-modal"
					/>
					{/* <CustomTextField label="Room ID" /> */}
				</div>

				<div className="guest-details-order">
					<CustomTextField
						className="custom-text-field-order-modal"
						value={guestOrder.roomId}
						label="Room ID"
						style={{ width: "100%" }}
					/>
				</div>

				<div className="guest-details-order ">
					<Autocomplete
						disablePortal
						loading={restaurantMealsList && restaurantMealsList.length === 0}
						// isOptionEqualToValue={(option, value) => option.title === value.title}
						getOptionLabel={(option: any) => option.dishOrBev}
						id="combo-box-demo"
						options={meals}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<CustomTextField
								{...params}
								label="Meals"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<>
											{restaurantMealsList && restaurantMealsList.length === 0 ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</>
									),
								}}
							/>
						)}
					/>
					<CustomTextField
						className="custom-text-field-order-modal"
						value={guestOrder.mealprice}
						name="mealPrice"
						onChange={(event) => dishPriceHandler(event.target.name, event.target.value)}
						label="Meal Price"
					/>
				</div>
				<div className="guest-details-order ">
					<Autocomplete
						disablePortal
						loading={restaurantMealsList && restaurantMealsList.length === 0}
						// isOptionEqualToValue={(option, value) => option.title === value.title}
						getOptionLabel={(option: any) => option.dishOrBev}
						id="combo-box-demo"
						options={beverages}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<CustomTextField
								{...params}
								label="Beverages"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<>
											{restaurantMealsList && restaurantMealsList.length === 0 ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</>
									),
								}}
							/>
						)}
					/>
					<CustomTextField
						name="beveragePrice"
						onChange={(event) => dishPriceHandler(event.target.name, event.target.value)}
						className="custom-text-field-order-modal"
						label="Price"
					/>
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
