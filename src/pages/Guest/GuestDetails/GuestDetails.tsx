import "./guest-details.css";
import GenericDashCards from "../../../components/Cards/GenericDashCards";
import { Typography } from "@mui/material";
import GuestProfile from "./GuestProfile";

function GuestDetails() {
	return (
		<div className="guest-details-container">
			<div className="current-booking-card">
				<GenericDashCards>Current Booking</GenericDashCards>
			</div>
			<div className="guest-profile-card">
				<GenericDashCards>
					<GuestProfile />
				</GenericDashCards>
			</div>

			<div className="booking-history-title grid-col-span-3">
				<Typography>Booking History</Typography>
				<div className="date-report-div">
					<div>Date filter</div>
					<div>Generate Report</div>
				</div>
			</div>
			<div className="guest-booking-history-card grid-col-span-3">
				<GenericDashCards>Booking History</GenericDashCards>
			</div>
		</div>
	);
}

export default GuestDetails;
