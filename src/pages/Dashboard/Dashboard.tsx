import "./dash.css";
import { BookmarkBorderRounded, LogoutRounded, LoginRounded, CalendarMonthRounded } from "@mui/icons-material";
import Calendar from "react-calendar";

import { GlanceCards } from "../../components/dashboard/GlanceCards";
import AvailableRooms from "../../components/dashboard/AvailableRooms";
import ReservationStat from "../../components/dashboard/ReservationStat";
import Review from "../../components/dashboard/Review";
import DashboardCalendar from "../../components/dashboard/Calendar";
import DashPieChart from "../../components/dashboard/PieChart";
import GenericDashCards from "../../components/Cards/GenericDashCards";
import GenericHeader from "../../components/Header/GenericHeader";

function Dashboard() {
	const glanceData = [
		{ name: "New Booking", number: 123, icon: <BookmarkBorderRounded fontSize="large" />, backgColor: "#c5b5d0" },
		{ name: "Schedule Room", number: 2, icon: <CalendarMonthRounded fontSize="large" />, backgColor: "#a5ecca" },
		{ name: "Check in", number: 3, icon: <LoginRounded fontSize="large" />, backgColor: "#f9d4a8" },
		{ name: "Check out", number: 5, icon: <LogoutRounded fontSize="large" />, backgColor: "#fcddda" },
	];
	return (
		<>
			<GenericHeader headerTitle="Dashboard" />
			<div className="dashboard-container">
				<div className="glance-cards-div">
					{glanceData.map(({ name, number, icon, backgColor }, index) => (
						<GlanceCards name={name} number={number} icon={icon} backgColor={backgColor} />
					))}
				</div>
				<div className="grid-mobile-col-span-2 ">
					<DashPieChart />
				</div>
				<div className="grid-col-span-3_row-span-2 grid-mobile-col-span-2">
					<ReservationStat />
				</div>
				<div className="grid-mobile-col-span-2">
					<AvailableRooms />
				</div>
				<div className="grid-col-span-2 grid-row-span-2 grid-mobile-col-span-2">
					<DashboardCalendar />
				</div>
				{/* <div className="grid-col-span-2"><GenericDashCards>Check in today list</GenericDashCards></div> */}
				<div className="grid-col-span-2  grid-row-span-2">
					<Review />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
