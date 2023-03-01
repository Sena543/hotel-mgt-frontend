import { Typography } from "@mui/material";
import GuestTable from "../../components/guest/GuestTable";
import "./guests.css";

function Guests() {
	return (
		<div className="guest-container">
			<div className="guest-title">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Guest List
				</Typography>
			</div>

			<GuestTable />
		</div>
	);
}

export default Guests;
