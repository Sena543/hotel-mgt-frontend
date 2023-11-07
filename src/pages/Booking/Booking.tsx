import "./booking.css";
import Welcome from "../../components/booking/Welome";
import BookingForm from "../../components/booking/BookingForm";
import About from "../../components/booking/About";
import ExploreRooms from "../../components/booking/ExploreRooms";
import Amenities from "../../components/booking/Amenities";

function Booking() {
    return (
        <div className="booking-div-container">
            <Welcome />
            <BookingForm />
            <About />
            <ExploreRooms />
            <Amenities />
        </div>
    );
}

export default Booking;
