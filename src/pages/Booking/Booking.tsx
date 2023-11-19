import "./booking.css";
import Welcome from "../../components/booking/Welome";
import BookingForm from "../../components/booking/BookingForm";
import About from "../../components/booking/About";
import ExploreRooms from "../../components/booking/ExploreRooms";
import Amenities from "../../components/booking/Amenities";
import Header from "../../components/booking/Header";
import Gallery from "../../components/booking/Gallery";
import Footer from "../../components/booking/Footer";

function Booking() {
	return (
		<div className="booking-div-container">
			<Header />
			<Welcome />
			<BookingForm />
			<Amenities />
			<About />
			<Gallery />
			<ExploreRooms />
			<Footer />
		</div>
	);
}

export default Booking;
