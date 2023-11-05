import "./booking.css";
import Welcome from "../../components/booking/Welome";
import BookingForm from "../../components/booking/BookingForm";
import About from "../../components/booking/About";
import ExploreRooms from "../../components/booking/ExploreRooms";

function Booking() {
	return (
		<div className="booking-div-container">
			<Welcome />
			<BookingForm />
			<About />
			<ExploreRooms />
		</div>
	);
}

export default Booking;
