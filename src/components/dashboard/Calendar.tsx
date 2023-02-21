import Calendar from "react-calendar";
import GenericDashCards from "../Cards/GenericDashCards";
import "react-calendar/dist/Calendar.css";
import "./dash-calendar.css";

function DashboardCalendar() {
	return (
		<GenericDashCards>
			{/* <div className="cal-container"> */}
			<Calendar />
			{/* </div> */}
		</GenericDashCards>
	);
	//return <GenericDashCards>Calendar</GenericDashCards>;
}

export default DashboardCalendar;
