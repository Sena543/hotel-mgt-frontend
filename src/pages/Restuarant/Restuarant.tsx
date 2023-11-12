import "./restaurant.css";
import { Button, Typography, Link as MuiLink } from "@mui/material";
import { useEffect, useState } from "react";
import OrderModal from "../../components/Restaurant/OrderModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { fetchAllGuestBookingHistory } from "../../redux/slices/bookingSlices";
import RestaurantTable from "../../components/Restaurant/RestaurantTable";

function Restuarant() {
	const dispatch = useDispatch<AppDispatch>();
	const { bookingHistory } = useSelector((state: any) => state.booking);
	// const bookingHistoryData = useSelector((state: any) => console.log(state));
	const [open, setOpenModal] = useState(false);
	const [mealOrderHistory, setMealOrderHistory] = useState();
	const [openMenu, setOpenMenuModal] = useState(false);

	useEffect(() => {
		if (bookingHistory.length === 0) {
			dispatch(fetchAllGuestBookingHistory());
		}

		let mealOrders: any = [];
		bookingHistory.forEach((booking: any) => {
			booking.mealOrderID.forEach((meal: any) => mealOrders.push(meal));
		});
		setMealOrderHistory(mealOrders);
	}, [bookingHistory, dispatch]);

	return (
		<div className="restaurant-container">
			<div className="restaurant-header">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Restaurant
				</Typography>

				<div className="header-button-div">
					<Link className="menu-link" to={"menu"}>
						<Button>View Menu</Button>
					</Link>
					<Button onClick={() => setOpenModal(true)}>Create Guest Order</Button>
				</div>
			</div>
			<div className="guest-restuarant-orders">
				{/* <GenericTable header={header} tableData={restaurantList} /> */}
				<RestaurantTable tableData={mealOrderHistory} />
			</div>

			<OrderModal open={open} setOpenModal={setOpenModal} />
		</div>
	);
}

export default Restuarant;
