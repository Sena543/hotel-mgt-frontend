import { Icon, Typography } from "@mui/material";
import "./current-booking.css";
import imgSvg from "../../../assets/react.svg";
import { BedOutlined, CalendarToday, KeyOutlined, Person, Person2Outlined, VpnKeyOutlined } from "@mui/icons-material";

const fontSize = 15;
function CurrentBooking() {
	return (
		<div className="current-booking-container">
			<div className="booking-history-div">
				<Typography fontWeight="bold" fontSize="20px">
					Current Booking
				</Typography>
			</div>
			<div className="room-image-container">
				<img loading="lazy" src={"https://picsum.photos/200/300"} alt="room image sample" />
				<img loading="lazy" src={"https://picsum.photos/200/300"} alt="room image sample" />
				<img loading="lazy" src={"https://picsum.photos/200/300"} alt="room image sample" />
				<img loading="lazy" src={"https://picsum.photos/200/300"} alt="room image sample" />
				<img loading="lazy" src={"https://picsum.photos/200/300"} alt="room image sample" />
			</div>
			<div>
				<div className="facilities-div">
					<Typography>Room Facilities</Typography>
					<Typography fontSize={14} color="gray">
						AC, Shower, Double Bed, Bath tub, TV, Wifi
					</Typography>
				</div>
				<div className="room-details">
					<div className="room-details">
						<div
							style={{
								backgroundColor: "#79c5f7",
								borderRadius: "60px",
								width: "50%",
								height: "75px",
								display: "grid",
								placeItems: "center",
							}}
						>
							<VpnKeyOutlined sx={{ fontSize: 40, color: "white" }} />
						</div>
						<div style={{ marginLeft: "5px" }}>
							<Typography>Booking ID #12345678</Typography>
							<Typography fontSize={fontSize} fontWeight="bolder">
								King Deluxe B-23
							</Typography>
						</div>
					</div>
					<div className="room-details-div">
						<div className="room-details">
							<Person2Outlined />
							<Typography fontSize={fontSize}>Room Capacity</Typography>
						</div>
						<Typography fontSize={fontSize + 2} fontWeight="bolder">
							3-5
						</Typography>
					</div>
					<div className="room-details-div">
						<div className="room-details">
							<BedOutlined />
							<Typography fontSize={fontSize}>Bed Type</Typography>
						</div>
						<Typography fontSize={fontSize + 2} fontWeight="bolder">
							Double
						</Typography>
					</div>
					<div className="room-details-div">
						<div className="room-details">
							<CalendarToday />
							<Typography fontSize={fontSize}>Booking Date</Typography>
						</div>
						<Typography fontSize={fontSize + 2} fontWeight="bolder">
							Oct 25th - 28th
						</Typography>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CurrentBooking;
