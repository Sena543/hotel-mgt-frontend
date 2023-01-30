import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

function Sidebar() {
	const sidebarNavLinks = [
		{ name: "Dashboard", link: "/" },
		{ name: "Room", link: "rooms" },
		{ name: "Booking", link: "booking" },
		{ name: "Guests", link: "guests" },
		{ name: "Concierge", link: "concierge" },
		{ name: "Staff", link: "employees" },
	];
	return (
		<Drawer variant="persistent" anchor="left" open={true}>
			<List>
				{sidebarNavLinks.map(({ name, link }) => (
					<ListItem key={link}>
						<Link to={link}>{name}</Link>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}

export default Sidebar;
