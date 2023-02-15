import "./dash.css";
import { BookmarkBorderRounded, LogoutRounded, LoginRounded, CalendarMonthRounded } from "@mui/icons-material";

import { GlanceCards } from "../../components/dashboard/GlanceCards";
import AvailableRooms from "../../components/dashboard/AvailableRooms";
import ReservationStat from "../../components/dashboard/ReservationStat";
import Review from "../../components/dashboard/Review";
import Calendar from "../../components/dashboard/Calendar";
import DashPieChart from "../../components/dashboard/PieChart";
import GenericDashCards from "../../components/Cards/GenericDashCards";

function Dashboard() {
	const glanceData = [
		{ name: "New Booking", number: 123, icon: <BookmarkBorderRounded fontSize="large" />, backgColor: "#c5b5d0" },
		{ name: "Schedule Room", number: 2, icon: <CalendarMonthRounded fontSize="large" />, backgColor: "#a5ecca" },
		{ name: "Check in", number: 3, icon: <LoginRounded fontSize="large" />, backgColor: "#f9d4a8" },
		{ name: "Check out", number: 5, icon: <LogoutRounded fontSize="large" />, backgColor: "#fcddda" },
	];
	return (
		<div className="dashboard-container">
			<div>
				{glanceData.map(({ name, number, icon, backgColor }) => (
					<GlanceCards name={name} number={number} icon={icon} backgColor={backgColor} />
				))}
			</div>
			<div>
				<DashPieChart />
			</div>
			<div className="grid-col-span-3_row-span-2">
				<ReservationStat />
			</div>
			<div>
				<AvailableRooms />
			</div>
			<div className="grid-col-span-2 grid-row-span-2">
				<Calendar />
			</div>
			<div className="grid-col-span-2">
				<GenericDashCards>Check in today list</GenericDashCards>
			</div>
			<div className="grid-col-span-2">
				<Review />
			</div>
		</div>
	);
}

export default Dashboard;
