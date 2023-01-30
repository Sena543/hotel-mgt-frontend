import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React from "react";

function Sidebar() {
	const sidebarNavLinks = ["Dashboard", "Room", "Booking", "Guests", "Concierge", "Staff"];
	return (
		<Drawer variant="persistent" anchor="left" open={true}>
			<List>
				{sidebarNavLinks.map((link) => (
					<ListItem>{link}</ListItem>
				))}
			</List>
		</Drawer>
	);
}

export default Sidebar;
