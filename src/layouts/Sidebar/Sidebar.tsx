import "./sidebar.css";
import {
	DashboardRounded,
	KingBedRounded,
	BookOnlineRounded,
	PortraitRounded,
	BadgeRounded,
	AccountBox,
} from "@mui/icons-material";
import { Drawer, ListItemIcon, ListItemText, ListItemButton, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

function Sidebar() {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const drawerWidth = 300;
	// const drawerWidth = 250;
	// const drawerWidth = 240;
	const sidebarNavLinks = [
		{ name: "Dashboard", link: "/", icon: <DashboardRounded fontSize="large" /> },
		{ name: "Room", link: "rooms", icon: <KingBedRounded fontSize="large" /> },
		{ name: "Booking", link: "booking", icon: <BookOnlineRounded fontSize="large" /> },
		{ name: "Guests", link: "guests", icon: <PortraitRounded fontSize="large" /> },
		{ name: "Concierge", link: "concierge", icon: <AccountBox fontSize="large" /> },
		{ name: "Staff", link: "employees", icon: <BadgeRounded fontSize="large" /> },
	];
	return (
		<>
			<CssBaseline />
			<Drawer
				variant="persistent"
				anchor="left"
				open={true}
				// sx={{
				// 	width: drawerWidth,
				// 	// width: `calc(100% - ${drawerWidth}px)`,
				// }}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Divider />
				<List>
					{sidebarNavLinks.map(({ name, link, icon }, index) => (
						<ListItem key={link}>
							<Link style={{ width: "100%" }} className="sidebar-link" to={link}>
								<ListItemButton
									className={`${
										selectedIndex === index ? "selected-page-style" : "default-page-style"
									}`}
									onClick={() => setSelectedIndex(index)}
									// disableRipple
									// style={{
									// 	margin: "10px",
									// 	borderRadius: 15,
									// 	boxShadow: `${selectedIndex === index ? "5px 5px 15px #dfd7e7" : ""}`,
									// 	color: `${selectedIndex === index ? "white" : ""}`,
									// 	background: `${
									// 		selectedIndex === index ? `linear-gradient(to right, #80529d, #a988bd)` : ""
									// 	}`,
									// }}
								>
									<ListItemIcon style={{ color: `${selectedIndex === index ? "white" : ""}` }}>
										{icon}
									</ListItemIcon>
									<ListItemText primary={name} />
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
}

export default Sidebar;
