import { Icon, IconButton, Typography } from "@mui/material";
import "./current-booking.css";
import Carousel from "react-elastic-carousel";
import {
	ArrowBackIos,
	ArrowForwardIos,
	ArrowForwardIosTwoTone,
	BedOutlined,
	CalendarToday,
	KeyOutlined,
	Person,
	Person2Outlined,
	VpnKeyOutlined,
} from "@mui/icons-material";
import CarouselImage from "./CarouselImage";
import { useState } from "react";

const fontSize = 15;
function CurrentBooking() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const imgs = [
		{
			url: "https://images.pexels.com/photos/13748845/pexels-photo-13748845.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/11856438/pexels-photo-11856438.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/14656123/pexels-photo-14656123.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/13748845/pexels-photo-13748845.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/13748845/pexels-photo-13748845.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/11856438/pexels-photo-11856438.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/14656123/pexels-photo-14656123.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
		{
			url: "https://images.pexels.com/photos/13748845/pexels-photo-13748845.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
		},
	];

	const next = () => {
		setCurrentIndex((currentIndex + 1) % imgs.length);
	};

	// move to the previous photo
	// if we are at the beginning, go to the last photo
	const prev = () => {
		setCurrentIndex((currentIndex - 1 + imgs.length) % imgs.length);
	};
	return (
		<div className="current-booking-container">
			<div className="booking-history-div">
				<Typography fontWeight="bold" fontSize="20px">
					Current Booking
				</Typography>
			</div>
			<Carousel itemsToShow={2.2}>
				{imgs.map(({ url }) => (
					<CarouselImage imgUrl={url} />
				))}
			</Carousel>
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
