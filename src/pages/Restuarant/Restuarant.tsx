import { Button, Typography } from "@mui/material";
import GenericTable from "../../components/Table/GenericTable";

function Restuarant() {
	const restaurantList = [
		{ guestid: 1, guestname: "Bruce Wayne", dishordered: "Rice", price: 100 },
		{ guestid: 2, guestname: "Bruce Wayne", dishordered: "Rice", price: 100 },
		{ guestid: 3, guestname: "Bruce Wayne", dishordered: "Rice", price: 100 },
		{ guestid: 4, guestname: "Bruce Wayne", dishordered: "Rice", price: 100 },
	];

	console.log(restaurantList);
	return (
		<div>
			<div>
				<Typography>Restuarant</Typography>
				<Button></Button>
			</div>
			<div className="guest-restuarant-orders">
				<GenericTable tableData={restaurantList} />
			</div>
		</div>
	);
}

export default Restuarant;
