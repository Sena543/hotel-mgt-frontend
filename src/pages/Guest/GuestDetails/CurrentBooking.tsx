import { Typography } from "@mui/material";
import "./current-booking.css";
import imgSvg from "../../../assets/react.svg";

function CurrentBooking() {
	return (
		<div className="current-booking-container">
			<div>
				<img src={imgSvg} alt="room image sample" />
				<img src={imgSvg} alt="room image sample" />
				<img src={imgSvg} alt="room image sample" />
				<img src={imgSvg} alt="room image sample" />
			</div>
			{/* <div> */}
			<div className="facilities-div">
				<Typography>Room Facilities</Typography>
				<Typography fontSize={14} color="gray">
					AC, Shower, Double Bed, Bath tub, TV, Wifi
				</Typography>
			</div>
			{/* </div> */}
			<div className="room-details"> </div>
		</div>
	);
}

export default CurrentBooking;
