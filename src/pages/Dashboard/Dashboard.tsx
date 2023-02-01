import React from "react";
import { BookmarkBorderRounded, LogoutRounded, LoginRounded, CalendarMonthRounded } from "@mui/icons-material";

import { GlanceCards } from "../../components/dashboard/GlanceCards";

function Dashboard() {
	const glanceData = [
		{ name: "New Booking", number: 123, icon: <BookmarkBorderRounded fontSize="large" />, backgColor: "#c5b5d0" },
		{ name: "Schedule Room", number: 2, icon: <CalendarMonthRounded fontSize="large" />, backgColor: "#a5ecca" },
		{ name: "Check in", number: 3, icon: <LoginRounded fontSize="large" />, backgColor: "#f9d4a8" },
		{ name: "Check out", number: 5, icon: <LogoutRounded fontSize="large" />, backgColor: "#fcddda" },
	];
	return (
		<div>
			<div style={{ display: "flex", flexDirection: "row" }}>
				{glanceData.map(({ name, number, icon, backgColor }) => (
					<GlanceCards name={name} number={number} icon={icon} backgColor={backgColor} />
				))}
			</div>
		</div>
	);
}

export default Dashboard;
