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

function Sidebar() {
	const drawerWidth = 740;
	const sidebarNavLinks = [
		{ name: "Dashboard", link: "/", icon: <DashboardRounded /> },
		{ name: "Room", link: "rooms", icon: <KingBedRounded /> },
		{ name: "Booking", link: "booking", icon: <BookOnlineRounded /> },
		{ name: "Guests", link: "guests", icon: <PortraitRounded /> },
		{ name: "Concierge", link: "concierge", icon: <AccountBox /> },
		{ name: "Staff", link: "employees", icon: <BadgeRounded /> },
	];
	return (
		<Drawer
			variant="persistent"
			anchor="left"
			open={true}
			sx={{
				width: drawerWidth,
				// width: `calc(100% - ${drawerWidth}px)`,
			}}
		>
			<Divider />
			<List>
				{sidebarNavLinks.map(({ name, link, icon }, index) => (
					<Link
						style={{ textDecoration: "none", color: "grey", borderRadius: 5, background: "blue" }}
						to={link}
					>
						<ListItemButton>
							<ListItem key={link}>
								<ListItemIcon>{icon}</ListItemIcon>
								<ListItemText primary={name} />
							</ListItem>
						</ListItemButton>
					</Link>
				))}
			</List>
		</Drawer>
	);
}

export default Sidebar;
