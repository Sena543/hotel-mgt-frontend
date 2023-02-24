import Calendar from "react-calendar";
import GenericDashCards from "../Cards/GenericDashCards";
import "react-calendar/dist/Calendar.css";
import "./dash-calendar.css";

function DashboardCalendar() {
	return (
		<div className="dashboard-calendar-container">
			<Calendar />
		</div>
	);
	//return <GenericDashCards>Calendar</GenericDashCards>;
}

export default DashboardCalendar;
