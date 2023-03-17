import "./restaurant.css";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import GenericTable from "../../components/Table/GenericTable";
import OrderModal from "../../components/Restaurant/OrderModal";

function Restuarant() {
	const [open, setOpenModal] = useState(false);
	const [openMenu, setOpenMenuModal] = useState(false);
	const restaurantList = [
		{ guestid: 1, guestname: "Bruce Wayne", dishordered: "Rice", price: 100 },
		{ guestid: 2, guestname: "Lionel Messi", dishordered: "Rice", price: 100 },
		{ guestid: 3, guestname: "Cristiano Ronaldo", dishordered: "Rice", price: 100 },
		{ guestid: 4, guestname: "Robert Lewandowski", dishordered: "Rice", price: 100 },
	];

	return (
		<div className="restaurant-container">
			<div className="restaurant-header">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Restaurant
				</Typography>

				<div className="header-button-div">
					<Button onClick={() => setOpenMenuModal(true)}>View Menu</Button>
					<Button onClick={() => setOpenModal(true)}>Create Guest Order</Button>
				</div>
			</div>
			<div className="guest-restuarant-orders">
				<GenericTable tableData={restaurantList} />
			</div>
			<OrderModal open={open} setOpenModal={setOpenModal} />
		</div>
	);
}

export default Restuarant;
