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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/types";

type BookingDetails = {
	bedType: string;
	bookingID: string;
	checkIn: string;
	checkOut: string;
	facility: string;
	guestID: string;
	mealOrderID: string[];
	imgUrls: string[];
	rawDocID: string;
	roomID: string;
	roomCapacity?: string;
};

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2.5, itemsToScroll: 1 },
	{ width: 768, itemsToShow: 3.5 },
	{ width: 1200, itemsToShow: 4.5 },
];
const fontSize = 15;
function CurrentBooking({ bookingDetails }: { bookingDetails: BookingDetails }) {
	const dispatch = useDispatch<AppDispatch>();
	const [currentIndex, setCurrentIndex] = useState(0);

	const next = () => {
		setCurrentIndex((currentIndex + 1) % bookingDetails.imgUrls.length);
	};

	// move to the previous photo
	// if we are at the beginning, go to the last photo
	const prev = () => {
		setCurrentIndex((currentIndex - 1 + bookingDetails.imgUrls.length) % bookingDetails.imgUrls.length);
	};

	return (
		<div className="current-booking-container">
			<div className="booking-history-div">
				<Typography fontWeight="bold" fontSize="20px">
					Current Booking
				</Typography>
			</div>
			<Carousel className="carousel-container" itemsToShow={2.3} itemsToScroll={2} isRTL={false}>
				{/* {bookingDetails?.imgUrls.length > 0
					? bookingDetails?.imgUrls.map((url, index) => (
							<CarouselImage key={url} imgUrl={url} index={index} />
					  ))
					: null} */}
				{bookingDetails?.imgUrls.map((url, index) => (
					<CarouselImage key={url} imgUrl={url} index={index} />
				))}
			</Carousel>
			<div>
				<div className="facilities-div">
					<Typography>Room Facilities</Typography>
					<Typography fontSize={14} color="gray">
						{bookingDetails?.facility}
					</Typography>
				</div>
				<div className="room-details">
					<div className="room-details">
						<div
							style={{
								backgroundColor: "#79c5f7",
								borderRadius: "50px",
								width: "100%",
								height: "50px",
								display: "grid",
								placeItems: "center",
							}}
						>
							<VpnKeyOutlined sx={{ margin: "0.1em", fontSize: 25, color: "white" }} />
						</div>
						<div style={{ marginLeft: "5px" }}>
							<Typography>Booking ID</Typography>
							<Typography fontSize={fontSize} fontWeight="bolder">
								#{`${bookingDetails?.bookingID}`}
							</Typography>
						</div>
					</div>
					<div className="room-details-div">
						<div className="room-details">
							<Person2Outlined />
							<Typography fontSize={fontSize}>Room Capacity</Typography>
						</div>
						<Typography fontSize={fontSize + 2} fontWeight="bolder">
							{/* {bookingDetails.roomCapacity ? bookingDetails.roomCapacity : "N/A"} */}
							N/A
						</Typography>
					</div>
					<div className="room-details-div">
						<div className="room-details">
							<BedOutlined />
							<Typography fontSize={fontSize}>Bed Type</Typography>
						</div>
						<Typography fontSize={fontSize + 2} fontWeight="bolder">
							{bookingDetails?.bedType}
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
