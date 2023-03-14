import "./sidebar.css";
import {
	DashboardRounded,
	KingBedRounded,
	BookOnlineRounded,
	PortraitRounded,
	BadgeRounded,
	AccountBox,
	MenuRounded,
	Restaurant,
} from "@mui/icons-material";
import {
	Drawer,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	Divider,
	Hidden,
	IconButton,
	useTheme,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
type SidebarProps = {
	window?: () => Window;
};
function Sidebar({ window }: SidebarProps) {
	const theme = useTheme();
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const drawerWidth = 240;
	const sidebarNavLinks = [
		{ name: "Dashboard", link: "/", icon: <DashboardRounded fontSize="large" /> },
		{ name: "Room", link: "rooms", icon: <KingBedRounded fontSize="large" /> },
		// { name: "Booking", link: "booking", icon: <BookOnlineRounded fontSize="large" /> },
		{ name: "Guests", link: "guests", icon: <PortraitRounded fontSize="large" /> },
		{ name: "Staff", link: "employees", icon: <BadgeRounded fontSize="large" /> },
		{ name: "Restuarant", link: "restaurant", icon: <Restaurant fontSize="large" /> },
	];

	const drawer = (
		<List>
			{sidebarNavLinks.map(({ name, link, icon }, index) => (
				<ListItem key={link}>
					<Link
						className={`sidebar-link ${
							selectedIndex === index ? "selected-page-style" : "default-page-style"
						}`}
						// className="sidebar-link"
						to={link}
						key={`${name}-${link}`}
					>
						<ListItemButton
							disableRipple
							// className={selectedIndex === index ? "selected-page-style" : "default-page-style"}
							onClick={() => setSelectedIndex(index)}
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
	);

	const container = window !== undefined ? () => window().document.body : undefined;
	return (
		<div className="sidebar-container" style={{ position: "relative" }}>
			<CssBaseline />
			<div className={"drawer-mobile-open"}>
				<IconButton onClick={handleDrawerToggle}>
					<MenuRounded style={{ color: theme.palette.primary.main }} sx={{ fontSize: 40 }} />
				</IconButton>
			</div>
			<div className="sidebar">
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							// display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						variant="persistent"
						anchor="left"
						open
						sx={{
							// display: { xs: "none", sm: "block" },
							width: drawerWidth,
							flexShrink: 0,
							"& .MuiDrawer-paper": {
								width: drawerWidth,
								boxSizing: "border-box",
							},
						}}
					>
						<Divider />
						{drawer}
						{/* <List>
							{sidebarNavLinks.map(({ name, link, icon }, index) => (
								<ListItem
									// className={selectedIndex === index ? "selected-page-style" : "default-page-style"}
									key={link}
								>
									<Link style={{ width: "100%" }} className="sidebar-link" to={link}>
										<ListItemButton
											className={selectedIndex === index ? "selected-page-style" : "default-page-style"}
											onClick={() => setSelectedIndex(index)}
										>
											<ListItemIcon style={{ color: `${selectedIndex === index ? "white" : ""}` }}>
												{icon}
											</ListItemIcon>
											<ListItemText primary={name} />
										</ListItemButton>
									</Link>
								</ListItem>
							))}
						</List> */}
					</Drawer>
				</Hidden>
			</div>
		</div>
	);
}

export default Sidebar;
// const drawer = (
// 	<List>
// 		{sidebarNavLinks.map(({ name, link, icon }, index) => (
// 			<ListItem
// 				// className={selectedIndex === index ? "selected-page-style" : "default-page-style"}
// 				key={link}
// 			>
// 				<Link className="sidebar-link" to={link}>
// 					<ListItemButton
// 						className={selectedIndex === index ? "selected-page-style" : "default-page-style"}
// 						onClick={() => setSelectedIndex(index)}
// 					>
// 						<ListItemIcon style={{ color: `${selectedIndex === index ? "white" : ""}` }}>
// 							{icon}
// 						</ListItemIcon>
// 						<ListItemText primary={name} />
// 					</ListItemButton>
// 				</Link>
// 			</ListItem>
// 		))}
// 	</List>
// );
